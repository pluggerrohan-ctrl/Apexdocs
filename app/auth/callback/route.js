import { NextResponse } from 'next/server'
import { createClient } from '../../../lib/supabase/server'

export async function GET(request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const requestedNext = url.searchParams.get('next') || '/'
  const next = requestedNext.startsWith('/') && !requestedNext.startsWith('//') ? requestedNext : '/'
  const errorParam = url.searchParams.get('error')
  const errorDesc = url.searchParams.get('error_description')

  console.log('[auth/callback] hit:', { code: !!code, next, error: errorParam })

  if (errorParam) {
    console.error('[auth/callback] OAuth provider error:', errorParam, errorDesc)
    return NextResponse.redirect(new URL(`/?auth_error=${encodeURIComponent(errorDesc || errorParam)}`, url.origin))
  }

  if (code) {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) {
        console.error('[auth/callback] exchangeCodeForSession error:', error)
        return NextResponse.redirect(new URL(`/?auth_error=${encodeURIComponent(error.message)}`, url.origin))
      }
      console.log('[auth/callback] session exchanged for user:', data?.user?.email)
    } catch (err) {
      console.error('[auth/callback] exchangeCodeForSession threw:', err)
      return NextResponse.redirect(new URL(`/?auth_error=${encodeURIComponent(err.message)}`, url.origin))
    }
  } else {
    console.warn('[auth/callback] no code in URL params')
  }

  return NextResponse.redirect(new URL(next, url.origin))
}
