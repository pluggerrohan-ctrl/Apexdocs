import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs'
import fs from 'fs'

// Copy parseRows and hasUsableRows from converter-app.jsx
function parseRows(raw) {
  const rows = []
  const dateAtStart = /^(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{1,2}\s+[A-Za-z]{3,9}\s+\d{2,4}|\d{4}[\/-]\d{1,2}[\/-]\d{1,2})(?:\s+|(?=[A-Za-z]))/i
  const columnPattern = /(?:—|–|(?<![A-Za-z])[-+]?\(?\s*(?:[$€£₹]\s*)?\d[\d,]*(?:\.\d{2})?\)?)/g
  const lines = raw.replace(/\r/g, '').split(/\n+/).map((line) => line.replace(/\s+/g, ' ').trim()).filter(Boolean)
  let previousBalance = null

  for (const line of lines) {
    const dateMatch = line.match(dateAtStart)
    if (!dateMatch) continue
    const date = dateMatch[1]
    const body = line.slice(dateMatch[0].length).replace(/^[-|:]\s*/, '').trim()
    const columns = [...body.matchAll(columnPattern)]
    if (columns.length < 2) continue

    const transactionColumns = columns.slice(-3)
    const firstColumnIndex = transactionColumns[0].index ?? 0
    const leftSide = body.slice(0, firstColumnIndex).trim()
    const description = leftSide.replace(/\s+(?:[A-Z]{2,}[A-Z0-9-]*|[A-Z0-9]{4,})$/, '').trim()
    const value = (text) => {
      if (!text || /^[—–-]$/.test(text.trim())) return ''
      const number = Number(text.replace(/[^\d.-]/g, ''))
      return Number.isFinite(number) ? Math.abs(number) : ''
    }
    const balance = value(transactionColumns.at(-1)?.[0])
    const amount = value(transactionColumns.at(-2)?.[0])
    const debit = transactionColumns.length >= 3 ? value(transactionColumns[0][0]) : (previousBalance !== null && balance < previousBalance ? amount : '')
    const credit = transactionColumns.length >= 3 ? value(transactionColumns[1][0]) : (previousBalance !== null && balance > previousBalance ? amount : '')

    rows.push({ Date: date, Description: description || 'Bank transaction', Debit: debit, Credit: credit, Balance: balance })
    previousBalance = balance
  }
  if (rows.length) return rows

  // Fallback 1: date-delimited records
  const datePattern = /\b(?:\d{4}[\/-]\d{1,2}[\/-]\d{1,2}|\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{1,2}\s+[A-Za-z]{3,9}\s+\d{2,4})\b/g
  const matches = [...raw.matchAll(datePattern)]
  const numberPattern = /(?:[$€£₹]\s*)?\(?\d[\d,]*(?:\.\d{2})?\)?/g
  for (let index = 0; index < matches.length; index += 1) {
    const start = matches[index].index ?? 0
    const end = matches[index + 1]?.index ?? raw.length
    const date = matches[index][0]
    const block = raw.slice(start + date.length, end).replace(/\s+/g, ' ').trim()
    const numbers = [...block.matchAll(numberPattern)]
    if (!numbers.length) continue
    const values = numbers.map((match) => Number(match[0].replace(/[^\d.]/g, ''))).filter(Number.isFinite)
    const balance = values.at(-1)
    if (!Number.isFinite(balance)) continue
    const amount = values.length > 1 ? values.at(-2) : (previousBalance === null ? '' : Math.abs(balance - previousBalance))
    const descriptionEnd = numbers[0].index ?? block.length
    const description = block.slice(0, descriptionEnd).replace(/\s+/g, ' ').trim()
    const delta = previousBalance === null ? 0 : balance - previousBalance
    rows.push({ Date: date, Description: description || 'Bank transaction', Debit: delta < 0 ? amount : '', Credit: delta > 0 ? amount : '', Balance: balance })
    previousBalance = balance
  }
  if (rows.length) return rows
  return rows
}

function hasUsableRows(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return false
  const validDates = rows.filter((row) => /\d{1,4}[\/-]\d{1,2}[\/-]\d{1,4}|\d{1,2}\s+[A-Za-z]{3,9}\s+\d{2,4}/.test(String(row.Date))).length
  const numericBalances = rows.filter((row) => row.Balance !== '' && Number.isFinite(Number(row.Balance))).length
  const meaningfulDescriptions = rows.filter((row) => String(row.Description || '').trim().length >= 3).length
  return validDates >= Math.max(1, Math.ceil(rows.length * 0.7)) && meaningfulDescriptions >= Math.max(1, Math.ceil(rows.length * 0.7)) && (numericBalances >= 1 || rows.some((row) => row.Debit !== '' || row.Credit !== ''))
}

async function extractText(filePath) {
  const buffer = fs.readFileSync(filePath)
  const pdf = await pdfjs.getDocument({ data: new Uint8Array(buffer), useSystemFonts: false, useWorkerFetch: false, isEvalSupported: false, disableWorker: true, disableFontFace: true }).promise
  let raw = ''
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    const items = content.items.filter(item => 'str' in item && item.str.trim())
    const lines = []
    for (const item of items) {
      const y = Math.round(item.transform[5])
      const line = lines.find(e => Math.abs(e.y - y) <= 2)
      if (line) line.parts.push(item.str)
      else lines.push({ y, parts: [item.str] })
    }
    const pageText = lines.sort((a, b) => b.y - a.y).map(l => l.parts.join(' ')).join('\n')
    raw += pageText + '\n'
  }
  return raw
}

const file = process.argv[2]
const text = await extractText(file)
const rows = parseRows(text)
console.log('Rows:', rows.length)
console.log('hasUsableRows:', hasUsableRows(rows))
console.log(JSON.stringify(rows, null, 2))
