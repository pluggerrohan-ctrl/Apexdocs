import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs'
import fs from 'fs'

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
console.log('=== EXTRACTED TEXT ===')
console.log(text)
console.log('=== END ===')
