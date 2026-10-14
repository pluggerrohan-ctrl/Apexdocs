'use client'

import { createBrowserClient } from '@supabase/ssr'

let client

export function createClient(url = process.env.NEXT_PUBLIC_SUPABASE_URL, anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  if (!client) {
    const supabaseUrl = url || process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || anonKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!supabaseUrl || !supabaseKey) throw new Error('Supabase public configuration is missing.')
    client = createBrowserClient(supabaseUrl, supabaseKey)
  }
  return client
}
