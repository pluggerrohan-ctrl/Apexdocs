import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

function jsonError(message, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status })
}

const MAX_LICENSE_KEY_LENGTH = 256
const DEFAULT_WORKER_URL = 'https://apexdocs.pluggerrohan.workers.dev'

function getClientIp(request) {
  return request.headers.get('CF-Connecting-IP') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return jsonError('Invalid JSON body.')
  }

  const action = body?.action
  const licenseKey = typeof body?.licenseKey === 'string' ? body.licenseKey.trim() : ''
  if (!['restore', 'quota', 'consume'].includes(action)) return jsonError('Unsupported action.')
  if (action === 'restore' && (!licenseKey || licenseKey.length > MAX_LICENSE_KEY_LENGTH)) return jsonError('A valid license key is required.')

  // The Worker URL is the only app-facing integration point. Secrets stay in Vercel Vars.
  const workerUrl = process.env.CREDITS_WORKER_URL || process.env.DODO_CREDITS_API_URL || DEFAULT_WORKER_URL
  if (!workerUrl) return NextResponse.json({ ok: false, error: 'Credit recovery is not configured yet.' }, { status: 503 })

  let target
  try {
    target = new URL(workerUrl)
    if (target.protocol !== 'https:') return jsonError('Credit registry must use HTTPS.', 503)
  } catch {
    return jsonError('Credit registry URL is invalid.', 503)
  }

  try {
    const upstream = await fetch(target, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ action, ...(action === 'restore' ? { licenseKey } : {}), ip: getClientIp(request) }),
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    })
    const result = await upstream.json().catch(() => null)
    if (!upstream.ok || !result?.ok) return NextResponse.json({ ok: false, error: result?.error || 'License recovery is unavailable right now.' }, { status: upstream.status >= 400 ? upstream.status : 502 })
    if (action === 'quota' || action === 'consume') {
      const remaining = Number(result.remaining)
      if (!Number.isSafeInteger(remaining) || remaining < 0 || remaining > 3) return jsonError('Invalid quota response.', 502)
      return NextResponse.json({ ok: true, remaining })
    }
    const credits = Number(result.credits)
    if (!Number.isSafeInteger(credits) || credits < 0) return jsonError('Invalid credit registry response.', 502)
    return NextResponse.json({ ok: true, credits })
  } catch {
    return jsonError('License recovery is unavailable right now.', 502)
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, service: 'credits', status: 'ready', configured: Boolean(process.env.CREDITS_WORKER_URL || process.env.DODO_CREDITS_API_URL) })
}
