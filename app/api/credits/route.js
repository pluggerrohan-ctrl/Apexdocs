import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

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
  const licenseKey = typeof body?.licenseKey === 'string' ? body.licenseKey.trim() : ''

  if (action !== 'restore') return jsonError('Unsupported action.')
  if (!licenseKey || licenseKey.length > 256) return jsonError('A valid license key is required.')

  // The payment registry must be connected before this route can safely restore credits.
  // Never accept a balance from the browser; the server must verify the key with Dodo.
  if (!process.env.DODO_PAYMENTS_API_KEY || !process.env.DODO_PAYMENTS_WEBHOOK_SECRET) {
    return NextResponse.json(
      { ok: false, error: 'Credit recovery is not configured yet.' },
      { status: 503 },
    )
  }

  return jsonError('Payment registry adapter is not connected.', 501)
}

export async function GET() {
  return NextResponse.json({ ok: true, service: 'credits', status: 'ready' })
}
