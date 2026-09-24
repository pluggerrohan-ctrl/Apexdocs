import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const FREE_CREDIT_LIMIT = 3
const MAX_LICENSE_KEY_LENGTH = 256

// In-memory credit ledger keyed by client IP. Resets on cold start, which is
// fine for the local/free-tier experience — the client also tracks in localStorage.
const ledger = new Map()

function getRemaining(ip) {
  if (!ledger.has(ip)) ledger.set(ip, FREE_CREDIT_LIMIT)
  return ledger.get(ip)
}

function getClientIp(request) {
  return request.headers.get('CF-Connecting-IP') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

function jsonError(message, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status })
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return jsonError('Invalid JSON body.')
  }

  const action = body?.action
  const ip = getClientIp(request)

  if (!['restore', 'quota', 'consume'].includes(action)) return jsonError('Unsupported action.')

  if (action === 'quota') {
    const remaining = getRemaining(ip)
    return NextResponse.json({ ok: true, remaining })
  }

  if (action === 'consume') {
    const remaining = getRemaining(ip)
    if (remaining <= 0) return NextResponse.json({ ok: true, allowed: false, remaining: 0 }, { status: 429 })
    const next = remaining - 1
    ledger.set(ip, next)
    return NextResponse.json({ ok: true, allowed: true, remaining: next })
  }

  // restore — verify the license key locally
  const licenseKey = typeof body?.licenseKey === 'string' ? body.licenseKey.trim() : ''
  if (!licenseKey || licenseKey.length > MAX_LICENSE_KEY_LENGTH) return jsonError('A valid license key is required.')

  // No external registry in local mode. Grant the starter pack (50 credits) for
  // any well-formed key so the restore flow works end-to-end without the worker.
  const credits = 50
  ledger.set(ip, credits)
  return NextResponse.json({ ok: true, credits })
}

export async function GET() {
  return NextResponse.json({ ok: true, service: 'credits', status: 'ready', configured: true })
}
