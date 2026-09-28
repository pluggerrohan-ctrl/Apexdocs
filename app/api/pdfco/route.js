import { NextResponse } from 'next/server'
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs'

const PDFCO_API = 'https://api.pdf.co/v1'

async function getPdfPageCount(file) {
  const data = new Uint8Array(await file.arrayBuffer())
  try {
    const document = await pdfjsLib.getDocument({ data, disableWorker: true }).promise
    const pageCount = document.numPages
    try {
      await document.destroy?.()
    } catch {
      // Cleanup failure does not make an otherwise valid PDF unreadable.
    }
    return pageCount
  } catch {
    // Next's server bundler cannot always resolve PDF.js's fake-worker module.
    // A PDF page tree still exposes one /Type /Page marker per rendered page.
    const text = new TextDecoder('latin1').decode(data)
    const pageMarkers = text.match(/\/Type\s*\/Page(?:\s|\/|>)/g)?.length || 0
    if (pageMarkers > 0) return pageMarkers

    // Object streams can hide the page tree from a plain-text scan. The PDF.co
    // conversion still processes the complete document, so a valid PDF must not
    // be rejected before the backup converter gets a chance to read it.
    if (text.startsWith('%PDF-')) return 1
    throw new Error('Unable to determine the PDF page count.')
  }
}

function parseCsv(csv) {
  const lines = String(csv || '').split(/\r?\n/).filter((line) => line.trim())
  if (lines.length < 2) return []
  const parseLine = (line) => {
    const cells = []
    let cell = ''
    let quoted = false
    for (let index = 0; index < line.length; index += 1) {
      const char = line[index]
      if (char === '"' && line[index + 1] === '"') { cell += '"'; index += 1; continue }
      if (char === '"') { quoted = !quoted; continue }
      if (char === ',' && !quoted) { cells.push(cell.trim()); cell = ''; continue }
      cell += char
    }
    cells.push(cell.trim())
    return cells
  }
  const headerRowIndex = lines.findIndex((line) => {
    const values = parseLine(line).map((value) => value.toLowerCase())
    return values.some((value) => value.includes('date')) && values.some((value) => value.includes('description') || value.includes('details'))
  })
  const header = parseLine(lines[headerRowIndex >= 0 ? headerRowIndex : 0]).map((value) => value.toLowerCase())
  const indexOf = (...names) => header.findIndex((value) => names.some((name) => value.includes(name)))
  const dateIndex = indexOf('date')
  const descriptionIndex = indexOf('description', 'memo', 'details', 'transaction')
  const debitIndex = indexOf('debit', 'withdrawal', 'outgoing')
  const creditIndex = indexOf('credit', 'deposit', 'incoming')
  const balanceIndex = indexOf('balance', 'running')
  return lines.slice(headerRowIndex >= 0 ? headerRowIndex + 1 : 1).map((line) => {
    const cells = parseLine(line).map((cell) => cell.replace(/^"+|"+$/g, '').trim())
    return {
      Date: cells[dateIndex] || cells[0] || '',
      Description: cells[descriptionIndex] || cells[1] || 'Bank transaction',
      Debit: cells[debitIndex] || '',
      Credit: cells[creditIndex] || '',
      Balance: cells[balanceIndex] || cells.at(-1) || '',
    }
  }).filter((row) => {
    const hasDate = /\d{1,4}[\/-]\d{1,2}[\/-]\d{1,4}|\d{1,2}\s+[A-Za-z]{3,9}\s+\d{2,4}/.test(row.Date)
    const hasAmount = [row.Debit, row.Credit, row.Balance].some((value) => /\d/.test(String(value)))
    return hasDate && hasAmount && row.Description !== '"'
  })
}

async function readJson(response) {
  const payload = await response.json().catch(() => ({}))
  if (!response.ok || payload.error) throw new Error(payload.message || payload.error || `PDF.co request failed (${response.status})`)
  return payload
}

async function convertWithKey(file, key) {
  const uploadForm = new FormData()
  uploadForm.append('file', file, file.name || 'statement.pdf')
  const upload = await readJson(await fetch(`${PDFCO_API}/file/upload`, {
    method: 'POST',
    headers: { 'x-api-key': key },
    body: uploadForm,
  }))
  if (!upload.url) throw new Error('PDF.co did not return an uploaded file URL.')

  const conversion = await readJson(await fetch(`${PDFCO_API}/pdf/convert/to/csv`, {
    method: 'POST',
    headers: { 'x-api-key': key, 'content-type': 'application/json' },
    body: JSON.stringify({ url: upload.url, async: false, csvDelimiter: ',' }),
  }))
  let csv = conversion.body
  if (!csv && conversion.url) csv = await (await fetch(conversion.url)).text()
  const rows = parseCsv(csv)
  if (!rows.length) throw new Error('PDF.co returned no readable transaction rows.')
  return rows
}

export async function POST(request) {
  const form = await request.formData()
  const file = form.get('file')
  const isPdf = file instanceof File && (file.type === 'application/pdf' || file.name?.toLowerCase().endsWith('.pdf'))
  if (!isPdf) return NextResponse.json({ ok: false, error: 'A PDF file is required.' }, { status: 400 })

  let totalPages
  try {
    totalPages = await getPdfPageCount(file)
  } catch (error) {
    console.error('[v0] PDF page count failed:', error)
    return NextResponse.json({ ok: false, error: 'Unable to read the PDF page count.' }, { status: 422 })
  }
  if (!Number.isSafeInteger(totalPages) || totalPages < 1) {
    return NextResponse.json({ ok: false, error: 'The PDF does not contain a valid page count.' }, { status: 422 })
  }

  const creditResponse = await fetch(new URL('/api/credits', request.url), {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ action: 'consume_pages', pages: totalPages }),
    cache: 'no-store',
  })
  const creditResult = await creditResponse.json().catch(() => null)
  const creditServiceUnavailable = !creditResponse.ok && (creditResponse.status >= 500 || creditResult?.error === 'License recovery is unavailable right now.')
  if ((!creditResponse.ok || !creditResult?.ok) && !creditServiceUnavailable) {
    const message = creditResult?.error || `Insufficient credits. You need ${totalPages} credits for this document.`
    return NextResponse.json({ ok: false, error: message, requiredCredits: totalPages }, { status: creditResponse.status === 429 ? 402 : creditResponse.status || 402 })
  }

  const keys = [process.env.PDFCO_API_KEY_PRIMARY, process.env.PDFCO_API_KEY_BACKUP].filter(Boolean)
  if (!keys.length) return NextResponse.json({ ok: false, error: 'PDF.co fallback is not configured.' }, { status: 503 })

  const errors = []
  for (const key of keys) {
    try {
      const rows = await convertWithKey(file, key)
      return NextResponse.json({ ok: true, rows, source: 'pdfco', pages: totalPages, creditsUsed: totalPages })
    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'PDF.co conversion failed')
    }
  }
  return NextResponse.json({ ok: false, error: errors.at(-1) || 'PDF.co conversion failed.' }, { status: 502 })
}

export const runtime = 'nodejs'
export const maxDuration = 60
