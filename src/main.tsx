import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { FileUp, ShieldCheck, Sparkles, Twitter } from 'lucide-react'
import '../index.css'

const steps = [
  ['Step 1', 'Upload your PDF', 'Drop up to two statements. Files go straight to our own server — never to a third party from your browser.'],
  ['Step 2', 'Text and OCR extraction', 'Digital statements are read structurally. Scanned or photographed pages fall back to OCR automatically.'],
  ['Step 3', 'Audited and aligned', 'Messy, unaligned lines are realigned like an accountant would: dates normalised, references separated, debit and credit never merged.'],
  ['Step 4', 'Clean XLSX download', 'Every statement becomes one sheet with Date, Description, Reference, Debit, Credit and Balance — ready for Excel.'],
]

function App() {
  const [fileName, setFileName] = useState('')

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#converter"><span className="brand-mark"><Sparkles size={19} /></span><span>ApexDoc</span></a>
        <nav aria-label="Main navigation"><a href="#converter">Converter</a><a href="#how-it-works">How it works</a><a href="#security">Security</a><a href="#feedback">Feedback</a></nav>
        <a className="social-link" href="https://x.com" aria-label="ApexDoc on X (Twitter)"><Twitter size={17} /></a>
      </header>

      <main>
        <section id="converter" className="hero content-width">
          <div className="hero-copy">
            <p className="eyebrow">BANK STATEMENT CONVERTER</p>
            <h1>The world&apos;s most trusted bank statement converter</h1>
            <p className="hero-description">Easily convert PDF bank statements from 1000+ banks worldwide into clean Excel (XLSX) format.</p>
            <dl className="feature-list"><div><dt>Any bank layout</dt><dd>One clean 6-column sheet</dd></div><div><dt>Scanned pages</dt><dd>OCR fallback built in</dd></div><div><dt>Two files</dt><dd>Per conversion request</dd></div></dl>
          </div>
          <label className="upload-card">
            <input className="sr-only" type="file" accept="application/pdf" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? '')} />
            <div className="upload-panel"><div className="upload-icon"><FileUp size={27} /></div><h2>Drag &amp; drop your bank statement</h2><p>PDF only · up to 2 files · max 20 MB each</p><span className="upload-button">Upload Bank Statement</span><small>{fileName || 'PDF → Clean Excel'}</small></div>
          </label>
        </section>

        <section id="how-it-works" className="section content-width"><p className="eyebrow">HOW IT WORKS</p><h2>Any bank layout in, one audit-ready spreadsheet out</h2><p className="section-intro">Whether your bank prints Narration and Withdrawal or Description and Debit, every statement is mapped to the same six columns: Date, Description, Reference, Debit, Credit and Balance. Missing values become 0.00 or a hyphen — never invented figures.</p><div className="steps">{steps.map(([label, title, text]) => <article key={label}><p className="step-label">{label}</p><h3>{title}</h3><p>{text}</p></article>)}</div></section>

        <section id="security" className="section security-section content-width"><p className="eyebrow">SECURITY</p><h2>Built for documents you would not email to a stranger</h2><div className="security-grid"><article><ShieldCheck size={21} /><h3>Keys stay on the server</h3><p>The processing API key lives only in server-side environment variables. It is never shipped to the browser.</p></article><article><ShieldCheck size={21} /><h3>No statement storage</h3><p>Your PDF is processed for the length of the request and the Excel file is streamed straight back to you.</p></article><article><ShieldCheck size={21} /><h3>Validated uploads</h3><p>Every file is checked for a real PDF signature and a sensible size limit before processing.</p></article></div></section>

        <section id="feedback" className="feedback content-width"><p className="eyebrow">FEEDBACK</p><h2>Did a statement not convert correctly?</h2><p>Tell us what happened and help us make ApexDoc better for everyone.</p><a href="mailto:hello@apexdoc.example">Share feedback</a></section>
      </main>
      <footer>Conversion usually finishes in under a minute, depending on statement length.</footer>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
