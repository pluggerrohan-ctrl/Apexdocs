'use client'

import { useEffect, useState, useRef } from 'react'
import { createClient } from '../lib/supabase/client'

export default function AccountMenu() {
  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)
  const [credits, setCredits] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState(null)
  const [signInBusy, setSignInBusy] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    let mounted = true
    let supabase
    try {
      supabase = createClient()
    } catch (err) {
      setAuthError(`Supabase init failed: ${err.message}`)
      setLoading(false)
      return
    }

    supabase.auth.getUser().then(({ data, error }) => {
      if (mounted) {
        setUser(data?.user ?? null)
        setLoading(false)
      }
    })

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => { mounted = false; listener?.subscription?.unsubscribe() }
  }, [])

  useEffect(() => {
    if (!user) { setCredits(null); return }
    fetch('/api/credits').then((r) => r.json()).then((d) => setCredits(d.credits ?? 0)).catch(() => setCredits(0))
  }, [user])

  useEffect(() => {
    const handleClick = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const signIn = async () => {
    setAuthError(null)
    setSignInBusy(true)

    let supabase
    try {
      supabase = createClient()
    } catch (err) {
      setAuthError(`Supabase init failed: ${err.message}`)
      setSignInBusy(false)
      return
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
      const msg = 'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY'
      setAuthError(msg)
      setSignInBusy(false)
      return
    }

    const redirectTo = `${window.location.origin}/auth/callback?next=/account`

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo },
      })

      if (error) {
        setAuthError(`Google login failed: ${error.message}`)
        setSignInBusy(false)
        return
      }

      // signInWithOAuth with browser client navigates the browser to Google.
      // If we get here without navigation, something is wrong.
      if (data?.url) {
        // The supabase-js browser client auto-navigates, but force it as fallback
        window.location.href = data.url
      } else {
        console.warn('[AccountMenu] No URL returned from signInWithOAuth, no navigation occurred')
        setAuthError('Login did not redirect. Check console for details.')
        setSignInBusy(false)
      }
    } catch (err) {
      setAuthError(`Login error: ${err.message}`)
      setSignInBusy(false)
    }
  }

  const signOut = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      setUser(null)
      setOpen(false)
    } catch (err) {
      setAuthError(`Logout error: ${err.message}`)
    }
  }

  if (loading) {
    return <div className="account-menu-wrap"><button className="account-signin" disabled aria-label="Checking account">Sign in</button></div>
  }

  if (!user) {
    return (
      <div className="account-menu-wrap" ref={wrapRef}>
        <button className="account-signin" onClick={signIn} disabled={signInBusy} aria-label="Continue with Google">
          <svg width="16" height="16" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
          </svg>
          <span>{signInBusy ? 'Redirecting…' : 'Continue with Google'}</span>
        </button>
        {authError && <div className="account-error" style={{ color: '#dc2626', fontSize: 11, fontWeight: 600, maxWidth: 220, marginTop: 4, textAlign: 'right' }}>{authError}</div>}
      </div>
    )
  }

  const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Account'
  const initial = name.charAt(0).toUpperCase()

  return (
    <div className="account-menu-wrap" ref={wrapRef}>
      <button className="account-button" aria-expanded={open} aria-label="Account menu" onClick={() => setOpen(!open)}>
        <span className="account-avatar">{initial}</span>
        <span className="account-info">
          <span className="account-name">{name}</span>
          <small className="account-credits">{credits ?? '—'} credits</small>
        </span>
      </button>
      {open && (
        <div className="account-dropdown" role="menu">
          <div className="account-dropdown-header">
            <span className="account-dropdown-name">{name}</span>
            <span className="account-dropdown-email">{user.email}</span>
          </div>
          <a href="/account" role="menuitem" onClick={() => setOpen(false)}>My Account</a>
          <a href="/account#credits" role="menuitem" onClick={() => setOpen(false)}>Credits: {credits ?? 0}</a>
          <a href="#pricing" role="menuitem" onClick={() => setOpen(false)}>Buy Credits</a>
          <button role="menuitem" onClick={signOut}>Logout</button>
        </div>
      )}
    </div>
  )
}
