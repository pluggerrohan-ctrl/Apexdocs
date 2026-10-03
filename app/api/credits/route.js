import { NextResponse } from 'next/server'
import { createClient } from '../../../lib/supabase/server'
import { createAdminClient } from '../../../lib/supabase/admin'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ ok: false, authenticated: false, credits: 0 }, { status: 401 })
  const { data: profile, error } = await supabase.from('profiles').select('email,display_name,credits').eq('user_id', user.id).maybeSingle()
  if (error) return NextResponse.json({ ok: false, error: 'Unable to load credits.' }, { status: 500 })
  return NextResponse.json({ ok: true, authenticated: true, credits: profile?.credits ?? 0, profile })
}

export async function POST(request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ ok: false, error: 'Sign in required.' }, { status: 401 })
  const body = await request.json().catch(() => ({}))
  if (body.action !== 'consume_paid') return NextResponse.json({ ok: false, error: 'Unsupported credit action.' }, { status: 400 })
  const admin = createAdminClient()
  const { data: remaining, error } = await admin.rpc('consume_apexdoc_credit', { p_user_id: user.id })
  if (error) return NextResponse.json({ ok: false, error: 'Unable to consume credit.' }, { status: 500 })
  if (remaining === null) return NextResponse.json({ ok: true, allowed: false, credits: 0 }, { status: 429 })
  return NextResponse.json({ ok: true, allowed: true, credits: remaining })
}
