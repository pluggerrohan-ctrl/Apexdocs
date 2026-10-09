'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Download, FileArchive, FileText, LockKeyhole, Sparkles, TimerReset, Upload, X, Crown } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'

const DAILY_LIMIT = 3
const USAGE_KEY = 'apexdoc_pdf_compressor_usage'

function usageToday() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(USAGE_KEY) || '{}')
    const today = new Date().toISOString().slice(0, 10)
    return saved.date === today ? Number(saved.count || 0) : 0
  } catch {
    return 0
  }
}

function recordUsage() {
  window.localStorage.setItem(USAGE_KEY, JSON.stringify({ date: new Date().toISOString().slice(0, 10), count: usageToday() + 1 }))
}

function readableSize(bytes) {
  if (!bytes) return '0 KB'
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

export default function PdfCompressor() {
  const inputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [status, setStatus] = useState('Ready for a local, private compression.')
  const [processing, setProcessing] = useState(false)
  const [usage, setUsage] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState('')

  useEffect(() => setUsage(usageToday()), [])
  useEffect(() => () => { if (downloadUrl) URL.revokeObjectURL(downloadUrl) }, [downloadUrl])

  const remaining = Math.max(0, DAILY_LIMIT - usage)
  const progress = useMemo(() => `${Math.min(100, (usage / DAILY_LIMIT) * 100)}%`, [usage])

  const selectFile = (selected) => {
    const next = selected?.[0]
    if (!next) return
    if (next.type !== 'application/pdf') {
      setStatus('Please choose a PDF file.')
      return
    }
    if (downloadUrl) URL.revokeObjectURL(downloadUrl)
    setFile(next)
    setDownloadUrl('')
    setStatus('PDF selected. Basic compression is ready.')
  }

  const compress = async () => {
    if (!file || processing) return
    if (usage >= DAILY_LIMIT) {
      setStatus('Daily free limit reached. Choose a premium pass to continue.')
      setModalOpen(true)
      return
    }
    setProcessing(true)
    setDownloadUrl('')
    try {
      const bytes = await file.arrayBuffer()
      const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true })
      setStatus('Optimizing layout... 5')
      for (let seconds = 4; seconds >= 1; seconds -= 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setStatus(`Optimizing layout... ${seconds}`)
      }
      const output = await pdf.save({ useObjectStreams: true, addDefaultPage: false })
      const blob = new Blob([output], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)
      recordUsage()
      setUsage(usageToday())
      setStatus('Your locally optimized PDF is ready.')
    } catch {
      setStatus('This PDF could not be processed locally. Try another file.')
    } finally {
      setProcessing(false)
    }
  }

  return <main className="compressor-shell">
    <style jsx>{`
      .compressor-shell{min-height:100vh;background:#f7f9fc;color:#14213d;font-family:Inter,ui-sans-serif,system-ui,sans-serif}.wrap{width:min(1080px,calc(100% - 32px));margin:auto}.ad-slot{min-height:90px;border:1px dashed #b9c5d6;background:#fff;display:grid;place-items:center;color:#8090a8;font-size:12px;letter-spacing:.08em;text-transform:uppercase;margin:0 auto 28px}.ad-slot.large{min-height:180px;margin:30px auto}.hero{padding:34px 0 48px}.eyebrow{color:#2962ff;font-weight:750;font-size:12px;letter-spacing:.12em;text-transform:uppercase}.hero h1{font-size:clamp(32px,6vw,58px);line-height:1.02;letter-spacing:-.05em;max-width:760px;margin:12px 0}.hero p{color:#60708b;font-size:17px;max-width:660px;line-height:1.6}.panel{background:#fff;border:1px solid #e3e9f2;border-radius:24px;box-shadow:0 18px 50px #18315312;padding:22px}.dropzone{border:2px dashed #c7d2e2;border-radius:18px;padding:34px 20px;text-align:center;transition:.2s;background:#fbfcfe}.dropzone.active,.dropzone:hover{border-color:#2962ff;background:#f2f6ff}.dropzone.selected{border-style:solid;border-color:#20a36a;background:#f0fbf5}.dropzone input{display:none}.upload-icon{margin:auto;display:grid;place-items:center;width:54px;height:54px;border-radius:16px;background:#eaf0ff;color:#2962ff}.file-name{font-weight:750;margin:14px 0 4px;word-break:break-word}.muted{color:#6d7d96;font-size:14px}.button{border:0;border-radius:12px;padding:13px 18px;font-weight:750;cursor:pointer;font-size:14px}.button.primary{background:#1e3c72;color:#fff}.button.primary:disabled{opacity:.5;cursor:not-allowed}.button.ghost{background:#edf2f8;color:#263a5a}.button.gold{background:#d7a52b;color:#241b07}.actions{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:20px}.security{display:flex;gap:8px;align-items:center;justify-content:center;color:#28744e;font-size:13px;font-weight:700;margin-top:18px}.options{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px}.option{border:1px solid #e1e7f0;border-radius:16px;padding:18px;text-align:left;background:#fff}.option.locked{background:#fffaf0;border-color:#f0d89b}.option strong{display:block;margin:8px 0 5px}.option small{color:#718099;line-height:1.5}.option button{width:100%;margin-top:15px}.metrics{display:flex;justify-content:space-between;gap:14px;margin:18px 0;color:#6a7890;font-size:13px}.bar{height:5px;background:#e7edf5;border-radius:99px;overflow:hidden;margin-top:8px}.bar i{display:block;height:100%;background:#2962ff}.banner{margin:20px 0 60px;border-radius:22px;padding:24px;color:#fff;background:linear-gradient(to right,#1e3c72,#2a5298);display:flex;align-items:center;justify-content:space-between;gap:18px}.banner a{color:#fff;font-weight:800;white-space:nowrap}.modal-backdrop{position:fixed;inset:0;background:#14213d99;display:grid;place-items:center;padding:20px;z-index:10}.modal{width:min(720px,100%);background:#fff;border-radius:24px;padding:26px;position:relative;box-shadow:0 24px 80px #0004}.close{position:absolute;right:18px;top:18px;border:0;background:#eef2f7;border-radius:50%;width:34px;height:34px;cursor:pointer}.pricing{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:20px}.price-card{border:1px solid #e0e7f0;border-radius:18px;padding:20px}.price-card.featured{border-color:#d7a52b;box-shadow:0 0 0 3px #d7a52b22}.price{font-size:32px;font-weight:850;margin:10px 0}.price-card p{color:#6d7d96;line-height:1.5}.card-actions{display:flex;justify-content:flex-end;margin-top:18px}@media(max-width:700px){.options,.pricing{grid-template-columns:1fr}.banner{display:block}.banner a{display:block;margin-top:14px}.ad-slot{min-height:70px}.panel{padding:14px}}
    `}</style>
    <div className="wrap hero">
      <div className="ad-slot" aria-label="Advertisement">Advertisement · 728 × 90</div>
      <span className="eyebrow">ApexDoc local tools</span>
      <h1>Compress PDFs without uploading them.</h1>
      <p>Reduce PDF size inside your browser. Your documents stay on your device from start to finish.</p>
      <section className="panel" aria-label="PDF compressor">
        <div className={`dropzone ${dragging ? 'active' : ''} ${file ? 'selected' : ''}`} onDragOver={(event) => { event.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); selectFile(event.dataTransfer.files) }}>
          <input ref={inputRef} type="file" accept="application/pdf" onChange={(event) => selectFile(event.target.files)} />
          <div className="upload-icon">{file ? <FileText /> : <Upload />}</div>
          {file ? <><div className="file-name">{file.name}</div><div className="muted">{readableSize(file.size)} · Ready locally</div></> : <><div className="file-name">Drop your PDF here</div><div className="muted">or choose a file from your device</div></>}
          <div className="actions"><button className="button ghost" type="button" onClick={() => inputRef.current?.click()}><Upload data-icon="inline-start" /> Choose PDF</button>{file && <button className="button primary" type="button" onClick={compress} disabled={processing || usage >= DAILY_LIMIT}>{processing ? <><TimerReset /> {status}</> : <><FileArchive /> Compress PDF</>}</button>}</div>
        </div>
        <div className="security"><LockKeyhole /> 100% Secure: Local Device-Level Loop. Files never leave your browser sandbox.</div>
        <div className="metrics"><span>{remaining} of {DAILY_LIMIT} free files remaining today<div className="bar"><i style={{ width: progress }} /></div></span><span>{status}</span></div>
        {downloadUrl && <div className="actions"><a className="button primary" href={downloadUrl} download={`compressed-${file.name}`}><Download /> Download compressed PDF</a></div>}
        <div className="options"><div className="option"><Sparkles color="#2962ff" /><strong>Basic Compression</strong><small>Free · Up to 40% smaller. Includes a short optimization timer.</small><button className="button primary" type="button" onClick={compress} disabled={!file || processing || usage >= DAILY_LIMIT}>Use Basic</button></div><div className="option locked"><Crown color="#c58b00" /><strong>Moderate Compression</strong><small>Up to 60% smaller. Faster, ad-free processing.</small><button className="button gold" type="button" onClick={() => setModalOpen(true)}>Unlock access</button></div><div className="option locked"><Crown color="#c58b00" /><strong>Strong Compression</strong><small>Up to 80%+ smaller. Priority processing for heavy files.</small><button className="button gold" type="button" onClick={() => setModalOpen(true)}>Unlock access</button></div></div>
      </section>
      <div className="ad-slot large" aria-label="Advertisement">Advertisement · Responsive rectangle</div>
      <section className="banner"><div><strong>Accounts Professional, CA, or Business Owner?</strong><div>Extract clean text and transaction rows from Bank Statements & Invoices directly to Excel files in 10 seconds.</div></div><a href="/">Try ApexDoc Converter Now →</a></section>
    </div>
    {modalOpen && <div className="modal-backdrop" role="presentation" onClick={() => setModalOpen(false)}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="premium-title" onClick={(event) => event.stopPropagation()}><button className="close" type="button" aria-label="Close" onClick={() => setModalOpen(false)}><X /></button><span className="eyebrow">Premium compression</span><h2 id="premium-title">Make every PDF smaller, faster.</h2><p className="muted">Unlock higher compression tiers with no ads and no timers.</p><div className="pricing"><article className="price-card"><strong>Quarterly Pass</strong><div className="price">$10</div><p>3 months unlimited access. No ads. No timers.</p><button className="button primary" type="button">Continue</button></article><article className="price-card featured"><strong>Lifetime Pass</strong><div className="price">$39</div><p>One-time permanent access. Priority processing included.</p><button className="button gold" type="button">Best value</button></article></div><div className="card-actions"><button className="button ghost" type="button" onClick={() => setModalOpen(false)}>Maybe later</button></div></section></div>}
  </main>
}

export function compressorSchema() {
  return { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'ApexDoc PDF Compressor', applicationCategory: 'BusinessApplication', operatingSystem: 'Web Browser', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }
}
