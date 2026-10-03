'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../lib/supabase/client'

export default function AccountMenu() {
  const supabase = createClient()
  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)
  const [credits, setCredits] = useState(null)

  useEffect(() => {
    let mounted = true
    supabase.auth.getUser().then(({ data }) => { if (mounted) setUser(data.user) })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null))
    return () => { mounted = false; listener.subscription.unsubscribe() }
  }, [supabase])

  useEffect(() => {
    if (!user) { setCredits(null); return }
    fetch('/api/credits').then((response) => response.json()).then((data) => setCredits(data.credits ?? 0)).catch(() => setCredits(0))
  }, [user])

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/auth/callback` } })
  }

  if (!user) return <button className="account-signin" onClick={signIn}>Continue with Google</button>

  const label = user.user_metadata?.full_name || user.user_metadata?.name || user.email
  return <div className="account-menu-wrap">
    <button className="account-button" aria-expanded={open} onClick={() => setOpen(!open)}><span>{label}</span><small>{credits ?? '—'} credits</small></button>
    {open && <div className="account-dropdown" role="menu">
      <a href="/account">My Account</a><a href="/account#credits">Credits: {credits ?? 0}</a><a href="#pricing">Buy Credits</a>
      <button onClick={() => supabase.auth.signOut()}>Logout</button>
    </div>}
  </div>
}
