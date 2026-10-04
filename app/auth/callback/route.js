import { NextResponse } from 'next/server'
import { createClient } from '../../../lib/supabase/server'

export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/account'
  const errorParam = requestUrl.searchParams.get('error')
  const errorDesc = requestUrl.searchParams.get('error_description')

  console.log('[auth/callback] hit:', { hasCode: !!code, next, error: errorParam })

  if (errorParam) {
    console.error('[auth/callback] OAuth provider error:', errorParam, errorDesc)
    const redirectUrl = new URL('/', requestUrl.origin)
    redirectUrl.searchParams.set('auth_error', errorDesc || errorParam)
    return NextResponse.redirect(redirectUrl)
  }

  if (!code) {
    console.warn('[auth/callback] no code param — redirecting to /account')
    return NextResponse.redirect(new URL('/account', requestUrl.origin))
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('[auth/callback] exchangeCodeForSession error:', error.message)
      const redirectUrl = new URL('/', requestUrl.origin)
      redirectUrl.searchParams.set('auth_error', error.message)
      return NextResponse.redirect(redirectUrl)
    }

    // Verify the session is actually established before redirecting
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      console.error('[auth/callback] no user after code exchange:', userError)
      const redirectUrl = new URL('/', requestUrl.origin)
      redirectUrl.searchParams.set('auth_error', 'Session not established after login')
      return NextResponse.redirect(redirectUrl)
    }

    console.log('[auth/callback] success — user:', user.email, 'redirecting to', next)
    return NextResponse.redirect(new URL(next, requestUrl.origin))
  } catch (err) {
    console.error('[auth/callback] threw:', err)
    const redirectUrl = new URL('/', requestUrl.origin)
    redirectUrl.searchParams.set('auth_error', err.message || 'Unknown auth error')
    return NextResponse.redirect(redirectUrl)
  }
}
