'use client'

import { createBrowserClient } from '@supabase/ssr'

let client

export function createClient(url = process.env.NEXT_PUBLIC_SUPABASE_URL, anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  if (!client) {
    client = createBrowserClient(url, anonKey)
  }
  return client
}
