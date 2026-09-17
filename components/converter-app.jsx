'use client'

import { useEffect, useRef, useState } from 'react'
import { FileUp, ShieldCheck, Sparkles, LoaderCircle, Download, RotateCcw } from 'lucide-react'
import * as XLSX from 'xlsx'

const CREDIT_KEY = 'apexdoc_credits'

function parseRows(raw) {
  const rows = []
  const lines = raw.replace(/\r/g, '').split('\n').map((line) => line.trim()).filter(Boolean)
  const date = /^(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{1,2}\s+[A-Za-z]{3,9}\s+\d{2,4}|\d{4}[\/-]\d{1,2}[\/-]\d{1,2})/
  for (const line of lines) {
    const match = line.match(date)
    if (!match) continue
    const numbers = line.match(/(?:[-+]?[\d,]+\.\d{2})/g) || []
    const values = numbers.map((value) => Number(value.replace(/,/g, '')))
    const description = line.slice(match[0].length).replace(/(?:[-+]?[\d,]+\.\d{2})/g, '').replace(/\s+/g, ' ').trim()
    rows.push({ Date: match[0], Description: description || 'Bank transaction', Debit: values.length > 1 ? Math.abs(values[0]) : '', Credit: values.length > 1 ? Math.abs(values[1]) : '', Balance: values.at(-1) ?? '' })
  }
  return rows
}

async function extractPdf(file) {
  try {
    const pdfjs = await import('pdfjs-dist/build/pdf.mjs')
    const buffer = await file.arrayBuffer()
    const pdf = await pdfjs.getDocument({ data: buffer }).promise
    let raw = ''
    for (let index = 1; index <= pdf.numPages; index += 1) {
      const page = await pdf.getPage(index)
      const content = await page.getTextContent()
      raw += `${content.items.map((item) => item.str).join(' ')}\n`
    }
    return raw
  } catch {
    return await file.text().catch(() => '')
  }
}

export default function ConverterApp({ bank }) {
  const inputRef = useRef(null)
  const [credits, setCredits] = useState(0)
  const [fileName, setFileName] = useState('')
  const [status, setStatus] = useState('')
  useEffect(() => {
    const sync = () => setCredits(Number(window.localStorage.getItem(CREDIT_KEY) || 0))
    sync(); window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])
  const saveCredits = (value) => { const next = Math.max(0, value); window.localStorage.setItem(CREDIT_KEY, String(next)); setCredits(next) }
  const convert = async (file) => {
    if (!file || file.type !== 'application/pdf') return setStatus('Please choose a PDF statement.')
    if (credits < 1) return setStatus('You need 1 credit to convert a statement.')
    setFileName(file.name); setStatus('Extracting locally…')
    try {
      const rows = parseRows(await extractPdf(file))
      const sheet = XLSX.utils.json_to_sheet(rows.length ? rows : [{ Date: '', Description: 'No text transactions found', Debit: '', Credit: '', Balance: '' }])
      const workbook = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(workbook, sheet, 'Transactions')
      XLSX.writeFile(workbook, `${bank.slug}-statement.xlsx`)
      saveCredits(credits - 1); setStatus(`Done — ${rows.length} transaction rows exported.`)
    } catch { setStatus('The file could not be converted locally. Please try another PDF.') }
  }
  const restore = async () => setStatus('License recovery needs the Dodo webhook registry endpoint and will be enabled once its server variables are connected.')
  return <div className="site-shell">
    <header className="topbar"><a className="brand" href="#converter"><span className="brand-mark"><Sparkles size={19} /></span><span>ApexDoc</span></a><nav aria-label="Main navigation"><a href="#converter">Home</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a><a href="#support">Support</a></nav><strong className="credit-badge">Remaining Credits: {credits}</strong></header>
    <main>
      <div className="trust-banner"><ShieldCheck size={17} /> Secure Browser-Locked Session Active. Files are auto-wiped after extraction and tokens stay tied to this browser.</div>
      <section id="converter" className="hero content-width"><div className="hero-copy"><p className="eyebrow">{bank.country.toUpperCase()} · {bank.name.toUpperCase()}</p><h1>{bank.slug === 'bank' ? 'PDF bank statement to Excel converter' : `${bank.name} bank statement to Excel converter`}</h1><p className="hero-description">Convert your PDF statement into a clean, audit-ready spreadsheet privately in your browser. No paid APIs and no document uploads.</p><div className="feature-list"><span><b>Local parsing</b><small>Zero API cost</small></span><span><b>One clean sheet</b><small>Date, Description, Debit, Credit, Balance</small></span><span><b>Instant export</b><small>Excel-ready XLSX</small></span></div></div><label className="upload-card"><input ref={inputRef} className="sr-only" type="file" accept="application/pdf" onChange={(event) => convert(event.target.files?.[0])} /><div className="upload-panel"><div className="upload-icon"><FileUp size={27} /></div><h2>Drop your {bank.slug === 'bank' ? 'PDF' : bank.name} statement</h2><p>PDF only · processed locally · never stored</p><span className="upload-button">{status.includes('Extracting') ? <LoaderCircle className="spin" size={16} /> : <Download size={16} />} Choose PDF</span><small>{fileName || status || '1 credit per conversion'}</small></div></label></section>
      <section id="pricing" className="section content-width"><p className="eyebrow">PRICING</p><h2>Simple credits. Private conversions.</h2><div className="pricing-grid"><article><p className="plan">STARTER</p><strong>$10</strong><p>50 conversion credits</p><a className="payment-button" href="https://checkout.dodopayments.com/buy/pdt_0NnVgAgVoDrlsxkmpv1JC?quantity=1" target="_blank" rel="noreferrer">Buy 50 credits</a></article><article className="featured"><p className="plan">PRO</p><strong>$39</strong><p>250 conversion credits</p><a className="payment-button" href="https://checkout.dodopayments.com/buy/pdt_0NnVoDX9vsN8YPPyBqB4R?quantity=1" target="_blank" rel="noreferrer">Buy 250 credits</a></article></div><div className="recovery"><h3>Recover your credits</h3><p>Bought credits before? Enter your unique License Key to sync your remaining balance on this browser session.</p><div className="recovery-row"><input aria-label="License Key" placeholder="License Key" /><button onClick={restore}><RotateCcw size={15} /> Restore Balance</button></div></div></section>
      <section id="faq" className="section content-width"><p className="eyebrow">FAQ</p><h2>Private by default.</h2><div className="faq-grid"><article><h3>Does my PDF leave my device?</h3><p>No. Text extraction and XLSX generation happen inside this browser.</p></article><article><h3>What if my PDF is scanned?</h3><p>This zero-cost parser handles text PDFs. Scanned PDFs need OCR, which can be added as an optional backend later.</p></article></div></section>
    </main><footer id="support"><span>Need help? <a href="mailto:namanbilthariya@gmail.com">namanbilthariya@gmail.com</a></span><a href="https://x.com/namanbuildai" target="_blank" rel="noreferrer">@namanbuildai</a></footer>
  </div>
}
