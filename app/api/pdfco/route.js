import { NextResponse } from 'next/server'
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs'

const PDFCO_API = 'https://api.pdf.co/v1'
const HEADERS = ['Date', 'Description', 'Debit', 'Credit', 'Balance']

function clean(value) {
  return String(value ?? '').replace(/^['\"]|['\"]$/g, '').trim()
}

function parseText(text) {
  const rows = []
  const normalizedText = String(text).replace(/(?<!^)(?=\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}\b|\d{4}[\/-]\d{1,2}[\/-]\d{1,2}\b)/g, '\n')
  const dateAtStart = /^(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{4}[\/-]\d{1,2}[\/-]\d{1,2}|\d{1,2}\s+[A-Za-z]{3,9}\s+\d{2,4})\b/i
  const amountPattern = /(?:[-+]?\(?\s*(?:[$€£₹]\s*)?\d[\d,]*(?:\.\d{2})?\)?)/g
  let previousBalance = null
  for (const rawLine of normalizedText.split(/\r?\n/)) {
    const line = rawLine.replace(/\s+/g, ' ').trim()
    const date = line.match(dateAtStart)?.[1]
    if (!date) continue
    const body = line.slice(date.length).replace(/^[-|:]\s*/, '').trim()
    const matches = [...body.matchAll(amountPattern)]
    if (matches.length < 2) continue
    const values = matches.slice(-3).map((match) => Number(match[0].replace(/[^\d.-]/g, ''))).filter(Number.isFinite)
    const balance = values.at(-1)
    const amount = values.at(-2)
    if (!Number.isFinite(balance)) continue
    const description = body.slice(0, matches[0].index ?? body.length).replace(/\s+/g, ' ').trim() || 'Bank transaction'
    rows.push({ Date: date, Description: description, Debit: values.length >= 3 ? values[0] : previousBalance !== null && balance < previousBalance ? amount : '', Credit: values.length >= 3 ? values[1] : previousBalance !== null && balance > previousBalance ? amount : '', Balance: balance })
    previousBalance = balance
  }
  return rows
}

function parseCsv(csv) {
  const lines = String(csv).split(/\r?\n/).filter((line) => line.trim())
  if (lines.length < 2) return []
  const cells = (line) => {
    const output = []
    let value = ''
    let quoted = false
    for (const char of line) {
      if (char === '"') quoted = !quoted
      else if (char === ',' && !quoted) { output.push(value); value = '' }
      else value += char
    }
    output.push(value)
    return output.map(clean)
  }
  const headerLineIndex = lines.findIndex((line) => {
    const candidate = cells(line).map((cell) => cell.toLowerCase())
    return candidate.some((cell) => cell === 'date' || cell.includes('transaction')) && candidate.some((cell) => cell.includes('description') || cell.includes('details'))
  })
  if (headerLineIndex < 0) return []
  const header = cells(lines[headerLineIndex]).map((cell) => cell.toLowerCase())
  const find = (names) => header.findIndex((cell) => names.some((name) => cell.includes(name)))
  const dateIndex = find(['date', 'posted', 'transaction'])
  const descriptionIndex = find(['description', 'memo', 'details', 'narration'])
  const debitIndex = find(['debit', 'withdrawal', 'charge'])
  const creditIndex = find(['credit', 'deposit'])
  const balanceIndex = find(['balance', 'running'])
  return lines.slice(headerLineIndex + 1).map((line) => {
    const row = cells(line)
    return { Date: row[dateIndex] || '', Description: row[descriptionIndex] || '', Debit: row[debitIndex] || '', Credit: row[creditIndex] || '', Balance: row[balanceIndex] || '' }
  }).filter((row) => row.Date || row.Description || row.Balance)
}

async function convertWithKey(file, key) {
  const upload = new FormData()
  upload.append('file', new Blob([await file.arrayBuffer()], { type: 'application/pdf' }), file.name || 'statement.pdf')
  const uploadResponse = await fetch(`${PDFCO_API}/file/upload`, { method: 'POST', headers: { 'x-api-key': key }, body: upload })
  if (!uploadResponse.ok) throw new Error(`PDF.co upload failed (${uploadResponse.status})`)
  const uploadResult = await uploadResponse.json()
  if (!uploadResult.url) throw new Error('PDF.co did not return an upload URL.')

  const conversionResponse = await fetch(`${PDFCO_API}/pdf/convert/to/csv`, {
    method: 'POST',
    headers: { 'x-api-key': key, 'content-type': 'application/json' },
    body: JSON.stringify({ url: uploadResult.url, async: false, csvDelimiter: ',', inline: true, unwrap: true }),
  })
  if (!conversionResponse.ok) throw new Error(`PDF.co conversion failed (${conversionResponse.status})`)
  const conversionResult = await conversionResponse.json()
  let csv = conversionResult.body
  if (!csv && conversionResult.url) {
    const csvResponse = await fetch(conversionResult.url)
    if (!csvResponse.ok) throw new Error(`PDF.co CSV download failed (${csvResponse.status})`)
    csv = await csvResponse.text()
  }
  if (csv) {
    const rows = parseCsv(csv)
    if (rows.length) return rows
  }

  const textResponse = await fetch(`${PDFCO_API}/pdf/convert/to/text`, {
    method: 'POST',
    headers: { 'x-api-key': key, 'content-type': 'application/json' },
    body: JSON.stringify({ url: uploadResult.url, async: false }),
  })
  if (!textResponse.ok) throw new Error(`PDF.co text extraction failed (${textResponse.status})`)
  const textResult = await textResponse.json()
  let text = textResult.body
  if (!text && textResult.url) {
    const textDownload = await fetch(textResult.url)
    if (!textDownload.ok) throw new Error(`PDF.co text download failed (${textDownload.status})`)
    text = await textDownload.text()
  }
  const rows = parseText(text)
  if (!rows.length) throw new Error(textResult.message || conversionResult.message || 'PDF.co found no transaction rows.')
  return rows
}

export async function POST(request) {
  const form = await request.formData()
  const file = form.get('file')
  const isPdf = file instanceof File && (file.type === 'application/pdf' || file.name?.toLowerCase().endsWith('.pdf'))
  if (!isPdf) return NextResponse.json({ ok: false, error: 'A PDF file is required.' }, { status: 400 })
  const localData = new Uint8Array(await file.arrayBuffer())
  try {
    const document = await pdfjs.getDocument({ data: localData, disableWorker: true, useWorkerFetch: false, isEvalSupported: false, disableFontFace: true, useSystemFonts: false }).promise
    let text = ''
    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
      const page = await document.getPage(pageNumber)
      const content = await page.getTextContent()
      text += content.items.filter((item) => 'str' in item).map((item) => item.str).join(' ') + '\n'
    }
    const localRows = parseText(text)
    if (localRows.length) return NextResponse.json({ ok: true, rows: localRows, source: 'browser-safe-local-parser' })
  } catch {}

  const keys = [
    process.env.PDFCO_API_KEY_PRIMARY,
    process.env.PDFCO_API_KEY_BACKUP,
    process.env.PDFCO_API_KEY,
    process.env.PDF_CO_API_KEY,
    process.env.key,
  ].filter(Boolean)
  if (!keys.length) return NextResponse.json({ ok: false, error: 'PDF fallback is not configured.' }, { status: 503 })
  let lastError = 'PDF fallback failed.'
  for (const key of keys) {
    try { return NextResponse.json({ ok: true, rows: await convertWithKey(file, key) }) } catch (error) { lastError = error instanceof Error ? error.message : lastError }
  }
  return NextResponse.json({ ok: false, error: lastError }, { status: 502 })
}

export const maxDuration = 120
