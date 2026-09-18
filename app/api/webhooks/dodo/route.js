import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const DEFAULT_WORKER_URL = 'https://apexdocs.pluggerrohan.workers.dev'

function response(message, status = 200) {
  return NextResponse.json({ ok: status < 400, message }, { status })
}

async function verifySignature(rawBody, signature, secret) {
  if (!signature || !secret) return false

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const digest = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(rawBody))
  const expected = Buffer.from(digest).toString('hex')
  const provided = signature.replace(/^sha256=/i, '').trim().toLowerCase()

  if (expected.length !== provided.length) return false
  let difference = 0
  for (let index = 0; index < expected.length; index += 1) difference |= expected.charCodeAt(index) ^ provided.charCodeAt(index)
  return difference === 0
}

export async function POST(request) {
  const rawBody = await request.text()
  const secret = process.env.DODO_PAYMENTS_WEBHOOK_SECRET
  const signature = request.headers.get('dodo-signature') || request.headers.get('x-dodo-signature') || request.headers.get('webhook-signature')

  if (!secret) return response('Webhook secret is not configured.', 503)
  if (!(await verifySignature(rawBody, signature, secret))) return response('Invalid webhook signature.', 401)

  let payload
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return response('Invalid webhook payload.', 400)
  }

  const workerUrl = process.env.CREDITS_WORKER_URL || DEFAULT_WORKER_URL
  const upstream = await fetch(workerUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ action: 'payment', payload }),
    cache: 'no-store',
    signal: AbortSignal.timeout(8000),
  }).catch(() => null)

  if (!upstream?.ok) return response('Credit registry unavailable.', 502)
  return response('Webhook accepted.')
}

export async function GET() {
  return response('Dodo webhook endpoint is ready.')
}
