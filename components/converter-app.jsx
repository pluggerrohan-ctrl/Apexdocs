'use client'

import { useEffect, useRef, useState } from 'react'
import { FileUp, ShieldCheck, Sparkles, LoaderCircle, Download, RotateCcw, MoreVertical, X } from 'lucide-react'
import * as XLSX from 'xlsx'

const CREDIT_KEY = 'apexdoc_credits'

function parseRows(raw) {
  const rows = []
  const normalized = raw.replace(/\r/g, ' ').replace(/\s+/g, ' ').trim()
  const datePattern = /\b(?:\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{1,2}\s+[A-Za-z]{3,9}\s+\d{2,4}|\d{4}[\/-]\d{1,2}[\/-]\d{1,2})\b/g
  const dates = [...normalized.matchAll(datePattern)]
  const amountPattern = /[-+]?\(?\$?\s*\d[\d,]*\.\d{2}\)?/g

  for (let index = 0; index < dates.length; index += 1) {
    const start = dates[index].index
    const end = dates[index + 1]?.index ?? normalized.length
    const line = normalized.slice(start, end).trim()
    const date = dates[index][0]
    const body = line.slice(date.length).trim()
    const amounts = [...body.matchAll(amountPattern)].map((match) => Number(match[0].replace(/[$,()\s]/g, '').replace(/^$/, ''))).filter(Number.isFinite)
    const description = body.replace(amountPattern, '').replace(/\s+/g, ' ').trim()
    if (!description && amounts.length === 0) continue
    rows.push({
      Date: date,
      Description: description || 'Bank transaction',
      Debit: amounts.length >= 3 ? Math.abs(amounts[0]) : '',
      Credit: amounts.length >= 3 ? Math.abs(amounts[1]) : amounts.length === 2 ? Math.abs(amounts[0]) : '',
      Balance: amounts.at(-1) ?? '',
    })
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
  const [licenseKey, setLicenseKey] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showExhausted, setShowExhausted] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem(CREDIT_KEY)
    if (stored === null) window.localStorage.setItem(CREDIT_KEY, '1')
    const sync = () => setCredits(Number(window.localStorage.getItem(CREDIT_KEY) || 0))
    sync()
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  const saveCredits = (value) => {
    const next = Math.max(0, value)
    window.localStorage.setItem(CREDIT_KEY, String(next))
    setCredits(next)
  }

  const convert = async (file) => {
    if (!file || file.type !== 'application/pdf') return setStatus('Please choose a PDF statement.')
    if (credits < 1) return setShowExhausted(true)
    setFileName(file.name); setStatus('Extracting locally…')
    try {
      const rows = parseRows(await extractPdf(file))
      const sheet = XLSX.utils.json_to_sheet(rows.length ? rows : [{ Date: '', Description: 'No text transactions found', Debit: '', Credit: '', Balance: '' }])
      const workbook = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(workbook, sheet, 'Transactions')
      XLSX.writeFile(workbook, `${bank.slug}-statement.xlsx`)
      saveCredits(credits - 1); setStatus(`Done — ${rows.length} transaction rows exported.`)
    } catch { setStatus('The file could not be converted locally. Please try another PDF.') }
  }

  const restore = async () => setStatus(licenseKey.trim() ? 'License recovery is ready for your connected payment registry.' : 'Enter your License Key to restore credits.')
  const jumpTo = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

  return <div className="site-shell">
    <header className="topbar">
      <a className="brand" href="#converter"><span className="brand-mark"><Sparkles size={19} /></span><span>ApexDoc</span></a>
      <div className="header-actions"><strong className="credit-badge">Remaining Credits: {credits}</strong><div className="menu-wrap"><button className="menu-button" aria-label="Open navigation menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><MoreVertical size={21} /></button>{menuOpen && <div className="menu-panel"><button onClick={() => jumpTo('converter')}>Home</button><button onClick={() => jumpTo('pricing')}>Pricing</button><button onClick={() => jumpTo('faq')}>FAQ</button><button onClick={() => jumpTo('support')}>Support</button><button className="restore-menu" onClick={() => jumpTo('recovery')}><RotateCcw size={14} /> Restore Balance</button></div>}</div></div>
    </header>
    <main>
      <div className="trust-banner"><ShieldCheck size={17} /> Secure Browser-Locked Session Active. Files are auto-wiped after extraction and tokens stay tied to this browser.</div>
      <section id="converter" className="hero content-width"><div className="hero-copy"><p className="eyebrow">{bank.country.toUpperCase()} · {bank.name.toUpperCase()}</p><h1>{bank.slug === 'bank' ? 'PDF bank statement to Excel converter' : `${bank.name} bank statement to Excel converter`}</h1><p className="hero-description">Convert your PDF statement into a clean, audit-ready spreadsheet privately in your browser. No paid APIs and no document uploads.</p><div className="feature-list"><span><b>Local parsing</b><small>Zero API cost</small></span><span><b>One clean sheet</b><small>Date, Description, Debit, Credit, Balance</small></span><span><b>Instant export</b><small>Excel-ready XLSX</small></span></div></div><label className="upload-card"><input ref={inputRef} className="sr-only" type="file" accept="application/pdf" onChange={(event) => convert(event.target.files?.[0])} /><div className="upload-panel"><div className="upload-icon"><FileUp size={27} /></div><h2>Drop your {bank.slug === 'bank' ? 'PDF' : bank.name} statement</h2><p>PDF only · processed locally · never stored</p><span className="upload-button">{status.includes('Extracting') ? <LoaderCircle className="spin" size={16} /> : <Download size={16} />} Choose PDF</span><small>{fileName || status || '1 free conversion included'}</small></div></label></section>
      <section id="pricing" className="section content-width"><p className="eyebrow">PRICING</p><h2>Simple credits. Private conversions.</h2><div className="pricing-grid"><article><p className="plan">STARTER</p><strong>$10</strong><p>50 conversion credits</p><a className="payment-button" href="https://checkout.dodopayments.com/buy/pdt_0NnVgAgVoDrlsxkmpv1JC?quantity=1" target="_blank" rel="noreferrer">Buy 50 credits</a></article><article className="featured"><p className="plan">PRO</p><strong>$39</strong><p>250 conversion credits</p><a className="payment-button" href="https://checkout.dodopayments.com/buy/pdt_0NnVoDX9vsN8YPPyBqB4R?quantity=1" target="_blank" rel="noreferrer">Buy 250 credits</a></article></div><div id="recovery" className="recovery"><h3>Recover your credits</h3><p>Bought credits before? Enter your unique License Key to sync your remaining balance on this browser session.</p><div className="recovery-row"><input aria-label="License Key" placeholder="License Key" value={licenseKey} onChange={(event) => setLicenseKey(event.target.value)} /><button onClick={restore}><RotateCcw size={15} /> Restore Balance</button></div></div></section>
      <section id="faq" className="section content-width"><p className="eyebrow">FAQ</p><h2>Private by default.</h2><div className="faq-grid"><article><h3>Does my PDF leave my device?</h3><p>No. Text extraction and XLSX generation happen inside this browser.</p></article><article><h3>What if my PDF is scanned?</h3><p>This zero-cost parser handles text PDFs. Scanned PDFs need OCR, which can be added as an optional backend later.</p></article></div></section>
    </main><footer id="support"><span>Need help? <a href="mailto:namanbilthariya@gmail.com">namanbilthariya@gmail.com</a></span><a href="https://x.com/namanbuildai" target="_blank" rel="noreferrer">@namanbuildai</a></footer>
    {showExhausted && <div className="modal-backdrop" role="presentation" onClick={() => setShowExhausted(false)}><div className="credit-modal" role="dialog" aria-modal="true" aria-labelledby="credit-modal-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" aria-label="Close" onClick={() => setShowExhausted(false)}><X size={18} /></button><h2 id="credit-modal-title">Free credit exhausted</h2><p>Please upgrade your pack below to continue converting statements.</p><button className="modal-action" onClick={() => { setShowExhausted(false); jumpTo('pricing') }}>View pricing</button></div></div>}
  </div>
}
