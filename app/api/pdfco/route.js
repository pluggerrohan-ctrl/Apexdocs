import { NextResponse } from 'next/server'

const PDFCO_API = 'https://api.pdf.co/v1'
const HEADERS = ['Date', 'Description', 'Debit', 'Credit', 'Balance']

function clean(value) {
  return String(value ?? '').replace(/^['\"]|['\"]$/g, '').trim()
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
  if (!csv) throw new Error(conversionResult.message || 'PDF.co returned no CSV data.')
  const rows = parseCsv(csv)
  if (!rows.length) throw new Error('PDF.co found no transaction rows.')
  return rows
}

export async function POST(request) {
  const form = await request.formData()
  const file = form.get('file')
  const isPdf = file instanceof File && (file.type === 'application/pdf' || file.name?.toLowerCase().endsWith('.pdf'))
  if (!isPdf) return NextResponse.json({ ok: false, error: 'A PDF file is required.' }, { status: 400 })
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
