'use client'

import { useEffect, useRef, useState } from 'react'
import { FileUp, ShieldCheck, Sparkles, LoaderCircle, Download, RotateCcw, MoreVertical, X } from 'lucide-react'
import * as XLSX from 'xlsx'

const CREDIT_KEY = 'apexdoc_credits_v2'
const FREE_CREDIT_LIMIT = 3

function parseRows(raw) {
  const rows = []
  const dateAtStart = /^(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{1,2}\s+[A-Za-z]{3,9}\s+\d{2,4}|\d{4}[\/-]\d{1,2}[\/-]\d{1,2})\s+/i
  const columnPattern = /(?:—|–|(?<![A-Za-z])[-+]?\(?\s*(?:[$€£₹]\s*)?\d[\d,]*(?:\.\d{2})?\)?)/g
  const lines = raw.replace(/\r/g, '').split(/\n+/).map((line) => line.replace(/\s+/g, ' ').trim()).filter(Boolean)

  for (const line of lines) {
    const dateMatch = line.match(dateAtStart)
    if (!dateMatch) continue
    const date = dateMatch[1]
    const body = line.slice(dateMatch[0].length).trim()
    const columns = [...body.matchAll(columnPattern)]
    if (columns.length < 3) continue

    // The final three columns are always Debit, Credit, and Balance. This
    // deliberately ignores digits in transaction references such as UPI0609.
    const transactionColumns = columns.slice(-3)
    const firstColumnIndex = transactionColumns[0].index ?? 0
    const leftSide = body.slice(0, firstColumnIndex).trim()
    const description = leftSide.replace(/\s+(?:[A-Z]{2,}[A-Z0-9-]*|[A-Z0-9]{4,})$/, '').trim()
    const value = (text) => {
      if (!text || /^[—–-]$/.test(text.trim())) return ''
      const number = Number(text.replace(/[^\d.-]/g, ''))
      return Number.isFinite(number) ? Math.abs(number) : ''
    }

    rows.push({
      Date: date,
      Description: description || 'Bank transaction',
      Debit: value(transactionColumns[0][0]),
      Credit: value(transactionColumns[1][0]),
      Balance: value(transactionColumns[2][0]),
    })
  }
  return rows
}

async function extractPdf(file) {
  try {
    const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs')
    const buffer = await file.arrayBuffer()
    const pdf = await pdfjs.getDocument({ data: new Uint8Array(buffer), useSystemFonts: true, isEvalSupported: false }).promise
    let raw = ''
    for (let index = 1; index <= pdf.numPages; index += 1) {
      const page = await pdf.getPage(index)
      const content = await page.getTextContent()
      const items = content.items.filter((item) => 'str' in item)
      const lines = []
      for (const item of items) {
        const y = Math.round(item.transform[5])
        const line = lines.find((entry) => Math.abs(entry.y - y) <= 2)
        if (line) line.parts.push(item.str)
        else lines.push({ y, parts: [item.str] })
      }
      raw += `${lines.sort((a, b) => b.y - a.y).map((line) => line.parts.join(' ')).join('\n')}\n`
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
    if (stored === null) window.localStorage.setItem(CREDIT_KEY, String(FREE_CREDIT_LIMIT))
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

  const restore = async () => {
    if (!licenseKey.trim()) return setStatus('Enter your License Key to restore credits.')
    setStatus('Checking your license securely…')
    try {
      const response = await fetch('/api/credits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'restore', licenseKey: licenseKey.trim() }),
      })
      const result = await response.json()
      if (!response.ok || !result.ok) return setStatus(result.error || 'License recovery is unavailable.')
      saveCredits(Number(result.credits) || 0)
      setStatus('Balance restored successfully.')
    } catch {
      setStatus('License recovery is unavailable right now.')
    }
  }
  const jumpTo = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

  return <div className="site-shell">
    <header className="topbar">
      <a className="brand" href="#converter"><span className="brand-mark"><Sparkles size={19} /></span><span>ApexDoc</span></a>
      <div className="header-actions"><strong className="credit-badge">Remaining Balance: {credits} Free Excel Sheets</strong><div className="menu-wrap"><button className="menu-button" aria-label="Open navigation menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><MoreVertical size={21} /></button>{menuOpen && <div className="menu-panel"><button onClick={() => jumpTo('converter')}>Home</button><button onClick={() => jumpTo('pricing')}>Pricing</button><button onClick={() => jumpTo('faq')}>FAQ</button><button onClick={() => jumpTo('support')}>Support</button><button className="restore-menu" onClick={() => jumpTo('recovery')}><RotateCcw size={14} /> Restore Balance</button></div>}</div></div>
    </header>
    <main>
      <div className="trust-banner"><ShieldCheck size={17} /> Secure Browser-Locked Session Active. Under strict privacy compliance, files are auto-wiped instantly after extraction and tokens stay tied to this browser.</div>
      <section id="converter" className="hero content-width"><div className="hero-copy"><p className="eyebrow">{bank.country.toUpperCase()} · {bank.name.toUpperCase()}</p><h1>{bank.slug === 'bank' ? 'PDF bank statement to Excel converter' : `${bank.name} bank statement to Excel converter`}</h1><p className="hero-description">Convert your PDF statement into a clean, audit-ready spreadsheet privately in your browser. No paid APIs and no document uploads.</p><div className="feature-list"><span><b>Local parsing</b><small>Zero API cost</small></span><span><b>One clean sheet</b><small>Date, Description, Debit, Credit, Balance</small></span><span><b>Instant export</b><small>Excel-ready XLSX</small></span></div></div><label className="upload-card"><input ref={inputRef} className="sr-only" type="file" accept="application/pdf" onChange={(event) => convert(event.target.files?.[0])} /><div className="upload-panel"><div className="upload-icon"><FileUp size={27} /></div><h2>Drop your {bank.slug === 'bank' ? 'PDF' : bank.name} statement</h2><p>PDF only · processed locally · never stored</p><span className="upload-button">{status.includes('Extracting') ? <LoaderCircle className="spin" size={16} /> : <Download size={16} />} Choose PDF</span><small>{fileName || status || '3 free Excel sheets included'}</small></div></label></section>
      <section id="pricing" className="section content-width"><p className="eyebrow">PRICING</p><h2>Simple credits. Private conversions.</h2><div className="pricing-grid"><article><p className="plan">STARTER</p><strong>$10</strong><p>Convert 50 PDF Bank Statements to Excel. Perfect for small business billing.</p><a className="payment-button" href="https://checkout.dodopayments.com/buy/pdt_0NnVgAgVoDrlsxkmpv1JC?quantity=1" target="_blank" rel="noreferrer">Buy 50 credits</a></article><article className="featured"><p className="plan">PRO</p><strong>$39</strong><p>Convert 250 PDF Bank Statements to Excel. Best value for professional CPAs and accounting firms.</p><a className="payment-button" href="https://checkout.dodopayments.com/buy/pdt_0NnVoDX9vsN8YPPyBqB4R?quantity=1" target="_blank" rel="noreferrer">Buy 250 credits</a></article></div><div id="recovery" className="recovery"><h3>Recover your credits</h3><p>Bought credits before? Enter your unique License Key to sync your remaining balance on this browser session.</p><div className="recovery-row"><input aria-label="License Key" placeholder="License Key" value={licenseKey} onChange={(event) => setLicenseKey(event.target.value)} /><button onClick={restore}><RotateCcw size={15} /> Restore Balance</button></div></div></section>
      <section id="faq" className="section content-width"><p className="eyebrow">FAQ</p><h2>Private by default.</h2><div className="faq-grid"><article><h3>Does my PDF leave my device?</h3><p>No. Text extraction and XLSX generation happen inside this browser.</p></article><article><h3>What if my PDF is scanned?</h3><p>This zero-cost parser handles text PDFs. Scanned PDFs need OCR, which can be added as an optional backend later.</p></article></div></section>
    </main><footer id="support"><span>Need help? <a href="mailto:namanbilthariya@gmail.com">namanbilthariya@gmail.com</a></span><a href="https://x.com/namanbuildai" target="_blank" rel="noreferrer">@namanbuildai</a><small className="legal-copy">Terms &amp; Conditions: We respect your privacy and do not store, track, or save any of your uploaded bank statement documents or financial data; all parsing occurs locally within your browser sandbox. This tool parses native text-PDF structures via automated regex matching. While we strive for 100% extraction accuracy, all converted files are provided &apos;as-is&apos; without warranties. Users must cross-verify the output spreadsheet against the original PDF. We accept zero liability or financial responsibility for any formatting mismatches, parsing omissions, or mathematical errors in the generated sheets.</small></footer>
    {showExhausted && <div className="modal-backdrop" role="presentation" onClick={() => setShowExhausted(false)}><div className="credit-modal" role="dialog" aria-modal="true" aria-labelledby="credit-modal-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" aria-label="Close" onClick={() => setShowExhausted(false)}><X size={18} /></button><h2 id="credit-modal-title">Free credit exhausted</h2><p>Please upgrade your pack below to continue converting statements.</p><button className="modal-action" onClick={() => { setShowExhausted(false); jumpTo('pricing') }}>View pricing</button></div></div>}
  </div>
}
