'use client'

import { createClient } from '../../lib/supabase/client'

export default function AccountView({ user, profile }) {
  const signIn = async () => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/account` },
    })
    if (error) console.error('[AccountView] signIn error:', error)
  }

  if (!user) {
    return (
      <main className="account-page">
        <h1>Your ApexDoc account</h1>
        <p>Sign in to link your credits and access your account across devices.</p>
        <button className="account-signin" onClick={signIn}>Continue with Google</button>
      </main>
    )
  }

  const displayName = profile?.display_name || user.user_metadata?.full_name || user.user_metadata?.name || user.email
  const paidCredits = profile?.credits ?? 0

  return (
    <main className="account-page">
      <h1>My Account</h1>
      <p className="account-email">{user.email}</p>
      <section id="credits">
        <strong>{paidCredits}</strong>
        <span>paid credits</span>
      </section>
      <p>Your documents are processed in your browser and are not stored in your account.</p>
    </main>
  )
}
