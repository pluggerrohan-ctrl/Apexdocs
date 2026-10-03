'use client'

import { createClient } from '../../lib/supabase/client'

export default function AccountView({ user, profile }) {
  const signIn = async () => createClient().auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/auth/callback` } })
  if (!user) return <main className="account-page"><h1>Your ApexDoc account</h1><p>Link credits to your account without storing documents.</p><button className="account-signin" onClick={signIn}>Continue with Google</button></main>
  return <main className="account-page"><h1>My Account</h1><p>{profile?.display_name || user.email}</p><section id="credits"><strong>{profile?.credits ?? 0}</strong><span>paid credits</span></section><p>Your documents are processed in the browser and are not stored in your account.</p></main>
}
