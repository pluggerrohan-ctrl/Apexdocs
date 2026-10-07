import { NextResponse } from 'next/server'
import { createClient } from '../../../lib/supabase/server'

const plans = {
  starter: { productId: 'pdt_0NnVgAgVoDrlsxkmpv1JC' },
  pro: { productId: 'pdt_0NnVoDX9vsN8YPPyBqB4R' },
}

export async function POST(request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Sign in is required before checkout.' }, { status: 401 })
  const { plan } = await request.json().catch(() => ({}))
  const selected = plans[plan]
  if (!selected) return NextResponse.json({ error: 'Invalid plan.' }, { status: 400 })
  const apiKey = process.env.DODO_PAYMENTS_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'Payment service is not configured.' }, { status: 503 })
  const response = await fetch('https://live.dodopayments.com/checkouts', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      product_cart: [{ product_id: selected.productId, quantity: 1 }],
      return_url: `${new URL(request.url).origin}/?checkout=success`,
      metadata: { user_id: user.id, plan },
      customer: { email: user.email },
    }),
    cache: 'no-store',
  })
  const result = await response.json().catch(() => null)
  if (!response.ok || !result?.checkout_url) return NextResponse.json({ error: result?.message || 'Unable to start checkout.' }, { status: 502 })
  return NextResponse.json({ checkoutUrl: result.checkout_url })
}
