'use client'

import { useEffect, useRef, useState } from 'react'
import { FileUp, ShieldCheck, Sparkles, LoaderCircle, Download, RotateCcw, MoreVertical, X } from 'lucide-react'
import * as XLSX from 'xlsx'

const CREDIT_KEY = 'apexdoc_credits_v2'
const FREE_CREDIT_LIMIT = 3

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

    // Statements commonly expose either amount + balance, or debit + credit + balance.
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

  // Some statements expose each table column as its own text layer. In that case,
  // reconstruct date-delimited records and infer debit/credit from balance movement.
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

  // Final fallback for PDFs whose text layer places every cell on its own line.
  const statementLines = raw.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
  let current = null
  let pendingText = []
  let pendingNumbers = []
  const flush = () => {
    if (!current || !pendingNumbers.length) return
    const balance = pendingNumbers.at(-1)
    const amount = pendingNumbers.length > 1 ? pendingNumbers.at(-2) : ''
    const delta = rows.length ? balance - rows.at(-1).Balance : 0
    rows.push({ Date: current, Description: pendingText.filter((text) => !/^[A-Z0-9-]{4,}$/.test(text)).join(' ') || 'Bank transaction', Debit: delta < 0 ? amount : '', Credit: delta > 0 ? amount : '', Balance: balance })
    pendingText = []
    pendingNumbers = []
  }
  for (const line of statementLines) {
    const date = line.match(/^(\d{1,2}\s+[A-Za-z]{3,9}\s+\d{2,4}|\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{4}[\/-]\d{1,2}[\/-]\d{1,2})$/)
    if (date) { flush(); current = date[1]; continue }
    const number = line.match(/^(?:[$€£₹]\s*)?\(?\d[\d,]*(?:\.\d{2})?\)?$/)
    if (number) pendingNumbers.push(Number(line.replace(/[^\d.]/g, '')))
    else if (current && !/^(Date|Description|Reference|Debit|Credit|Balance|Currency)$/i.test(line)) pendingText.push(line)
  }
  flush()
  if (rows.length) return rows

  // Normalized text fallback: PDF.js may insert newlines between every cell.
  const normalized = raw.replace(/[|\u00a0]+/g, ' ').replace(/\s+/g, ' ').trim()
  const recordPattern = /(?:^|\s)(\d{1,2}\s+[A-Za-z]{3,9}\s+\d{2,4}|\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{4}[\/-]\d{1,2}[\/-]\d{1,2})(.*?)(?=\s+(?:\d{1,2}\s+[A-Za-z]{3,9}\s+\d{2,4}|\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{4}[\/-]\d{1,2}[\/-]\d{1,2})|$)/g
  let priorBalance = null
  for (const match of normalized.matchAll(recordPattern)) {
    const date = match[1]
    const body = match[2].trim()
    const numbers = [...body.matchAll(/(?:[$€£₹]\s*)?\(?\d[\d,]*(?:\.\d{2})?\)?/g)]
    if (numbers.length < 2) continue
    const values = numbers.map((item) => Number(item[0].replace(/[^\d.]/g, ''))).filter(Number.isFinite)
    const balance = values.at(-1)
    const amount = values.at(-2)
    if (!Number.isFinite(balance)) continue
    const firstNumber = numbers[0].index ?? body.length
    const description = body.slice(0, firstNumber).replace(/\s+(?:REF|PAY|ELEC|CARD|INV|TRF|FEE|INS|INT)[-\w]+$/i, '').trim()
    const delta = priorBalance === null ? 0 : balance - priorBalance
    rows.push({ Date: date, Description: description || 'Bank transaction', Debit: delta < 0 ? amount : '', Credit: delta > 0 ? amount : '', Balance: balance })
    priorBalance = balance
  }
  return rows
}

function hasUsableRows(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return false
  const validDates = rows.filter((row) => /\d{1,4}[\/-]\d{1,2}[\/-]\d{1,4}|\d{1,2}\s+[A-Za-z]{3,9}\s+\d{2,4}/.test(String(row.Date))).length
  const numericBalances = rows.filter((row) => row.Balance !== '' && Number.isFinite(Number(row.Balance))).length
  const meaningfulDescriptions = rows.filter((row) => String(row.Description || '').trim().length >= 3).length
  return validDates >= Math.max(1, Math.ceil(rows.length * 0.7)) && meaningfulDescriptions >= Math.max(1, Math.ceil(rows.length * 0.7)) && (numericBalances >= 1 || rows.some((row) => row.Debit !== '' || row.Credit !== ''))
}

async function extractPdf(file, onProgress) {
  try {
    const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs')
    const buffer = await file.arrayBuffer()
    const pdf = await pdfjs.getDocument({ data: new Uint8Array(buffer), useSystemFonts: false, useWorkerFetch: false, isEvalSupported: false, disableWorker: true, disableFontFace: true }).promise
    let raw = ''
    let hasText = false
    for (let index = 1; index <= pdf.numPages; index += 1) {
      const page = await pdf.getPage(index)
      const content = await page.getTextContent()
      const items = content.items.filter((item) => 'str' in item && item.str.trim())
      const lines = []
      for (const item of items) {
        const y = Math.round(item.transform[5])
        const line = lines.find((entry) => Math.abs(entry.y - y) <= 2)
        if (line) line.parts.push(item.str)
        else lines.push({ y, parts: [item.str] })
      }
      const pageText = lines.sort((a, b) => b.y - a.y).map((line) => line.parts.join(' ')).join('\n')
      if (pageText.trim()) hasText = true
      raw += `${pageText}\n`
    }

    if (hasText && hasUsableRows(parseRows(raw))) return raw

    // A PDF can contain decorative text without usable transaction rows. Run local OCR
    // instead of stopping early so scanned and flattened bank statements still convert.
    raw = hasText ? '' : raw
    onProgress?.('Scanning pages locally…')
    const { createWorker } = await import('tesseract.js')
    const worker = await createWorker('eng')
    try {
      for (let index = 1; index <= pdf.numPages; index += 1) {
        const page = await pdf.getPage(index)
        const viewport = page.getViewport({ scale: 2 })
        const canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise
        const result = await worker.recognize(canvas)
        raw += `${result.data.text}\n`
        onProgress?.(`Scanning page ${index} of ${pdf.numPages}…`)
      }
    } finally {
      await worker.terminate()
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
  const [isConverting, setIsConverting] = useState(false)
  const [quotaLocked, setQuotaLocked] = useState(false)
  const convertingRef = useRef(false)

  useEffect(() => {
    let active = true
    const sync = () => setCredits(Number(window.localStorage.getItem(CREDIT_KEY) || 0))
    const initializeQuota = async () => {
      const stored = window.localStorage.getItem(CREDIT_KEY)
      if (stored === null) window.localStorage.setItem(CREDIT_KEY, String(FREE_CREDIT_LIMIT))
      sync()
      try {
        const response = await fetch('/api/credits', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'quota' }) })
        const result = await response.json()
        if (!active || !response.ok || !result.ok) return
        const remaining = Math.max(0, Number(result.remaining))
        window.localStorage.setItem(CREDIT_KEY, String(remaining))
        setCredits(remaining)
        if (remaining === 0) setQuotaLocked(true)
      } catch {
        // Preserve the local free-tier experience when the optional quota worker is unavailable.
      }
    }
    initializeQuota()
    window.addEventListener('storage', sync)
    return () => { active = false; window.removeEventListener('storage', sync) }
  }, [])

  const saveCredits = (value) => {
    const next = Math.max(0, value)
    window.localStorage.setItem(CREDIT_KEY, String(next))
    setCredits(next)
  }

  const convert = async (file) => {
    const isPdf = file && (file.type === 'application/pdf' || file.name?.toLowerCase().endsWith('.pdf'))
    if (!isPdf) return setStatus('Please choose a PDF statement.')
    if (convertingRef.current) return
    if (quotaLocked || credits < 1) return setShowExhausted(true)

    convertingRef.current = true
    setIsConverting(true)
    setFileName(file.name)
    setStatus('Extracting text locally…')
    try {
      const localExtraction = extractPdf(file, setStatus)
      let extractedText = ''
      try {
        extractedText = await Promise.race([
          localExtraction,
          new Promise((resolve) => setTimeout(() => resolve(''), 8000)),
        ])
      } catch {
        extractedText = ''
      }
      let rows = parseRows(extractedText)
      if (!hasUsableRows(rows)) {
        rows = []
        setStatus('Local conversion needs help. Trying secure PDF backup…')
        const form = new FormData()
        form.append('file', file)
        const fallbackResponse = await fetch('/api/pdfco', { method: 'POST', body: form })
        const fallbackResult = await fallbackResponse.json().catch(() => null)
        if (fallbackResponse.ok && fallbackResult?.ok && hasUsableRows(fallbackResult.rows)) rows = fallbackResult.rows
      }
      if (!hasUsableRows(rows)) {
        setStatus('No readable transactions found. Your credit was not used.')
        return
      }

      let serverRemaining = null
      try {
        const quotaResponse = await fetch('/api/credits', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'consume' }) })
        const quotaResult = quotaResponse.ok ? await quotaResponse.json().catch(() => null) : null
        if (quotaResponse.status === 429 || (quotaResponse.ok && quotaResult?.ok && quotaResult.allowed === false)) {
          saveCredits(0)
          setQuotaLocked(true)
          setShowExhausted(true)
          return
        }
        if (quotaResponse.ok && quotaResult.ok) serverRemaining = Number(quotaResult.remaining)
      } catch {
        // Use local credits only if the optional worker is unavailable.
      }

      const sheet = XLSX.utils.json_to_sheet(rows, {
        header: ['Date', 'Description', 'Debit', 'Credit', 'Balance'],
      })
      sheet['!cols'] = [{ wch: 14 }, { wch: 42 }, { wch: 14 }, { wch: 14 }, { wch: 16 }]
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, sheet, 'Transactions')
      const workbookBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
      const downloadUrl = URL.createObjectURL(new Blob([workbookBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }))
      const downloadLink = document.createElement('a')
      downloadLink.href = downloadUrl
      downloadLink.download = `${bank.slug}-statement.xlsx`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      downloadLink.remove()
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000)
      saveCredits(serverRemaining === null ? Math.max(0, Number(window.localStorage.getItem(CREDIT_KEY) || 0) - 1) : serverRemaining)
      setStatus(`Done — ${rows.length} transaction rows exported.`)
    } catch {
      setStatus('Conversion service was unreachable. Please retry; your credit was not used.')
    } finally {
      convertingRef.current = false
      setIsConverting(false)
    }
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
      <div className="header-actions"><strong className="credit-badge" aria-label={`Remaining balance: ${credits} free Excel sheets`}><span className="credit-badge-full">Credit: {credits}</span><span className="credit-badge-short">Credit: {credits}</span></strong><div className="menu-wrap"><button className="menu-button" aria-label="Open navigation menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><MoreVertical size={21} /></button>{menuOpen && <div className="menu-panel"><button onClick={() => jumpTo('converter')}>Home</button><button onClick={() => jumpTo('pricing')}>Pricing</button><button onClick={() => jumpTo('faq')}>FAQ</button><button onClick={() => jumpTo('support')}>Support</button><button className="restore-menu" onClick={() => jumpTo('recovery')}><RotateCcw size={14} /> Restore Balance</button></div>}</div></div>
    </header>
    <main>
      <div className="trust-banner"><ShieldCheck size={16} /><span><b>Private by default.</b> Files are processed in your browser and never stored.</span></div>
      <section id="converter" className="hero content-width"><div className="hero-copy"><p className="eyebrow">{bank.country.toUpperCase()} · {bank.name.toUpperCase()}</p><h1>{bank.slug === 'bank' ? 'Bank statement to Excel converter' : `${bank.name} statement to Excel converter`}</h1><p className="hero-description">Convert PDF statements into a clean, audit-ready spreadsheet privately in your browser. Supports 1000+ formats with no paid APIs and no document uploads.</p><div className="feature-list"><span><b>Local parsing</b><small>Zero API cost</small></span><span><b>One clean sheet</b><small>Date, Description, Debit, Credit, Balance</small></span><span><b>Instant export</b><small>Excel-ready XLSX</small></span></div></div><label className="upload-card"><input ref={inputRef} className="sr-only" type="file" accept="application/pdf" disabled={isConverting || quotaLocked || credits < 1} onChange={(event) => convert(event.target.files?.[0])} /><div className="upload-panel"><div className="upload-icon"><FileUp size={27} /></div><h2>Drop your {bank.slug === 'bank' ? 'PDF' : bank.name} statement</h2><p>PDF only · processed locally · never stored</p><span className="upload-button">{status.includes('Extracting') ? <LoaderCircle className="spin" size={16} /> : <Download size={16} />} Choose PDF</span><small>{isConverting ? status : (status || fileName || '3 free Excel sheets included')}</small></div></label></section>
      <section id="pricing" className="section content-width"><p className="eyebrow">PRICING</p><h2>Simple credits. Private conversions.</h2><div className="pricing-grid"><article><p className="plan">STARTER</p><strong>$10</strong><p>Convert 50 PDF Bank Statements to Excel. Perfect for small business billing.</p><p>🔒 100% Risk-Free Money-Back Guarantee: If you experience any parsing glitches, email us for an instant full refund.</p><a className="payment-button" href="https://checkout.dodopayments.com/buy/pdt_0NnVgAgVoDrlsxkmpv1JC?quantity=1" target="_blank" rel="noreferrer">Buy 50 credits</a></article><article className="featured"><p className="plan">PRO</p><strong>$39</strong><p>Convert 250 PDF Bank Statements to Excel. Best value for professional CPAs and accounting firms.</p><a className="payment-button" href="https://checkout.dodopayments.com/buy/pdt_0NnVoDX9vsN8YPPyBqB4R?quantity=1" target="_blank" rel="noreferrer">Buy 250 credits</a></article></div><div id="recovery" className="recovery"><h3>Recover your credits</h3><p>Bought credits before? Enter your unique License Key to sync your remaining balance on this browser session.</p><div className="recovery-row"><input aria-label="License Key" placeholder="License Key" value={licenseKey} onChange={(event) => setLicenseKey(event.target.value)} /><button onClick={restore}><RotateCcw size={15} /> Restore Balance</button></div></div></section>
      <section id="faq" className="section content-width"><p className="eyebrow">FAQ</p><h2>Private by default.</h2><div className="faq-grid"><article><h3>Does my PDF leave my device?</h3><p>No. Text extraction and XLSX generation happen inside this browser.</p></article><article><h3>What if my PDF is scanned?</h3><p>This zero-cost parser handles text PDFs. Scanned PDFs need OCR, which can be added as an optional backend later.</p></article></div></section>
    </main><footer id="support"><span>Need help? <a href="mailto:namanbilthariya@gmail.com">namanbilthariya@gmail.com</a></span><a href="https://x.com/namanbuildai" target="_blank" rel="noreferrer">@namanbuildai</a><a href="/all-banks">All Supported Banks</a><small className="legal-copy">Terms &amp; Conditions: We respect your privacy and do not store, track, or save any of your uploaded bank statement documents or financial data; all parsing occurs locally within your browser sandbox. This tool parses native text-PDF structures via automated regex matching. While we strive for 100% extraction accuracy, all converted files are provided &apos;as-is&apos; without warranties. Users must cross-verify the output spreadsheet against the original PDF. We accept zero liability or financial responsibility for any formatting mismatches, parsing omissions, or mathematical errors in the generated sheets.</small><a className="easylaunch-badge" href="https://easylaunch.dev/saas/apexdoc-pdf-converter" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', marginTop: 12 }}><img src="https://easylaunch.dev/badge/easylaunch-badge-light.svg" alt="Featured on EasyLaunch" width="120" height="36" style={{ display: 'block' }} /></a></footer>
    {showExhausted && <div className="modal-backdrop" role="presentation" onClick={() => setShowExhausted(false)}><div className="credit-modal" role="dialog" aria-modal="true" aria-labelledby="credit-modal-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" aria-label="Close" onClick={() => setShowExhausted(false)}><X size={18} /></button><h2 id="credit-modal-title">Free credit exhausted</h2><p>Please upgrade your pack below to continue converting statements.</p><button className="modal-action" onClick={() => { setShowExhausted(false); jumpTo('pricing') }}>View pricing</button></div></div>}
  </div>
}
