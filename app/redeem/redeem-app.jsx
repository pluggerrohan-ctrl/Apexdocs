'use client'

import { useState } from 'react'
import { Sparkles, ShieldCheck, Check, ArrowRight } from 'lucide-react'

export default function RedeemApp() {
  const [code, setCode] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const redeem = (event) => {
    event.preventDefault()
    if (!code.trim()) return
    setSubmitted(true)
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="/">
          <span className="brand-mark"><Sparkles size={19} /></span>
          <span>ApexDoc</span>
        </a>
      </header>
      <main>
        <div className="trust-banner">
          <ShieldCheck size={16} />
          <span><b>Private by default.</b> Files are processed in your browser and never stored.</span>
        </div>
        <section className="redeem-section content-width">
          <div className="redeem-card">
            <p className="eyebrow">APPSUMO REDEMPTION</p>
            <h1>Redeem Your AppSumo Code</h1>
            <p className="redeem-subheading">Enter your AppSumo code to activate 3 free conversions.</p>

            {!submitted ? (
              <form className="redeem-form" onSubmit={redeem}>
                <label className="redeem-label" htmlFor="redeem-code">Enter AppSumo redemption code</label>
                <input
                  id="redeem-code"
                  className="redeem-input"
                  type="text"
                  placeholder="Enter AppSumo redemption code"
                  value={code}
                  autoComplete="off"
                  spellCheck={false}
                  onChange={(event) => setCode(event.target.value)}
                />
                <button className="redeem-button" type="submit">Redeem Code</button>
              </form>
            ) : (
              <>
                <div className="redeem-message redeem-success" role="status">
                  <span className="redeem-success-icon"><Check size={18} /></span>
                  <span>Successfully Submitted! Your AppSumo redemption has been received.</span>
                </div>
                <a className="redeem-start" href="/">
                  Start Converting <ArrowRight size={16} />
                </a>
              </>
            )}
          </div>
        </section>
      </main>
      <footer>
        <span>Need help? <a href="mailto:namanbilthariya@gmail.com">namanbilthariya@gmail.com</a></span>
        <a href="/">Back to ApexDoc</a>
      </footer>
    </div>
  )
}
