'use client'

import { useState } from 'react'
import { Sparkles, LoaderCircle, ShieldCheck, Check, ArrowRight } from 'lucide-react'

const CREDIT_KEY = 'apexdoc_credits_v2'

export default function RedeemApp() {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const redeem = async () => {
    const trimmed = code.trim()
    if (!trimmed) {
      setError('Please enter your AppSumo redemption code.')
      setStatus('')
      return
    }
    setError('')
    setStatus('')
    setSuccess(false)
    setLoading(true)
    try {
      const response = await fetch('/api/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: trimmed }),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.ok) {
        setError(result?.error || 'Redemption failed. Please check your code and try again.')
        return
      }
      // Activate the granted free conversions on this browser session.
      const granted = Number(result.credits) || 3
      const current = Number(window.localStorage.getItem(CREDIT_KEY) || 0)
      window.localStorage.setItem(CREDIT_KEY, String(Math.max(current, granted)))
      setSuccess(true)
      setStatus('Your 3 free conversions have been activated.')
    } catch {
      setError('Redemption service was unreachable. Please retry.')
    } finally {
      setLoading(false)
    }
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

            {!success && (
              <div className="redeem-form">
                <label className="redeem-label" htmlFor="redeem-code">Enter AppSumo redemption code</label>
                <input
                  id="redeem-code"
                  className="redeem-input"
                  type="text"
                  placeholder="Enter AppSumo redemption code"
                  value={code}
                  autoComplete="off"
                  spellCheck={false}
                  disabled={loading}
                  onChange={(event) => setCode(event.target.value)}
                  onKeyDown={(event) => { if (event.key === 'Enter' && !loading) redeem() }}
                />
                <button className="redeem-button" type="button" disabled={loading} onClick={redeem}>
                  {loading ? <LoaderCircle className="spin" size={18} /> : null}
                  {loading ? 'Redeeming…' : 'Redeem Code'}
                </button>
              </div>
            )}

            {error && <div className="redeem-message redeem-error" role="alert">{error}</div>}
            {success && (
              <div className="redeem-message redeem-success" role="status">
                <span className="redeem-success-icon"><Check size={18} /></span>
                <span>{status}</span>
              </div>
            )}
            {success && (
              <a className="redeem-start" href="/">
                Start Converting <ArrowRight size={16} />
              </a>
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
