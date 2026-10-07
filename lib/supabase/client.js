'use client'

import { createBrowserClient } from '@supabase/ssr'

let client

export function createClient() {
  if (!client) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!supabaseUrl || !supabaseKey) throw new Error('Supabase public configuration is missing.')
    client = createBrowserClient(supabaseUrl, supabaseKey)
  }
  return client
}
