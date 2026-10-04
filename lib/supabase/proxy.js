import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function updateSession(request) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // getSession is critical: it refreshes the access token if expired
  // and calls setAll to write the refreshed session cookies into the response.
  // getUser alone does NOT refresh tokens or set cookies.
  const { data: { session } } = await supabase.auth.getSession()

  // Only run getUser if we have a session, to avoid unnecessary calls for anon visitors
  if (session) {
    await supabase.auth.getUser()
  }

  return response
}
