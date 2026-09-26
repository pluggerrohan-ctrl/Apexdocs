import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

function jsonError(message, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status })
}

const MAX_CODE_LENGTH = 128
const DEFAULT_WORKER_URL = 'https://apexdocs.pluggerrohan.workers.dev'

function getClientIp(request) {
  return request.headers.get('CF-Connecting-IP') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

// The AppSumo code registry lives in the same credit worker that backs /api/credits.
// Codes are verified, marked single-use, and grant 3 free conversions server-side —
// the full list of 1,000 codes never reaches the client. This route only proxies the
// redemption request and surfaces the worker's verdict.
export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return jsonError('Invalid JSON body.')
  }

  const code = typeof body?.code === 'string' ? body.code.trim() : ''
  if (!code) return jsonError('Please enter your AppSumo redemption code.')
  if (code.length > MAX_CODE_LENGTH) return jsonError('That code looks too long. Please check and try again.')

  const workerUrl = process.env.CREDITS_WORKER_URL || process.env.DODO_CREDITS_API_URL || DEFAULT_WORKER_URL
  let target
  try {
    target = new URL(workerUrl)
    if (target.protocol !== 'https:') return jsonError('Redemption registry must use HTTPS.', 503)
  } catch {
    return jsonError('Redemption registry URL is invalid.', 503)
  }

  try {
    const paths = ['/api/redeem', '/redeem', '']
    let upstream
    let result
    for (const path of paths) {
      const endpoint = new URL(path, target)
      upstream = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({ action: 'redeem', code, ip: getClientIp(request) }),
        cache: 'no-store',
        signal: AbortSignal.timeout(8000),
      })
      result = await upstream.json().catch(() => null)
      if (upstream.ok && result?.ok) break
      if (upstream.status !== 404 && upstream.status !== 405) break
    }

    if (!upstream?.ok || !result?.ok) {
      return NextResponse.json(
        { ok: false, error: result?.error || 'Redemption is unavailable right now. Please try again later.' },
        { status: upstream?.status >= 400 ? upstream.status : 502 },
      )
    }

    // On a successful redemption the worker grants exactly 3 free conversions.
    const credits = Number(result.credits)
    const granted = Number.isSafeInteger(credits) && credits > 0 ? credits : 3
    return NextResponse.json({ ok: true, credits: granted })
  } catch {
    return jsonError('Redemption service was unreachable. Please retry.', 502)
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, service: 'redeem', status: 'ready' })
}
