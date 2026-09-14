-- Run this once in Supabase → SQL Editor.
-- Tracks free-tier usage and Pro status per device, server-side.
-- This table is the real source of truth for limits — the edge
-- function (using the service role key) is the only thing that
-- reads or writes it.

create table if not exists public.usage_limits (
  device_id  text primary key,
  month      text not null,
  count      integer not null default 0,
  is_pro     boolean not null default false,
  plan       text,
  updated_at timestamptz not null default now()
);

-- RLS is enabled with NO policies added on purpose: this blocks every
-- direct client-side request to this table (anon key can't read or
-- write it at all). Only the edge function, using the service role
-- key (which bypasses RLS), can touch it.
alter table public.usage_limits enable row level security;

-- Until you wire up a real payment webhook (Stripe/Razorpay), grant
-- Pro manually for a paying user by running:
--   update public.usage_limits set is_pro = true, plan = 'pro'
--   where device_id = 'paste-their-device-id-here';
-- You can find a user's device_id by asking them to open browser
-- devtools → Application → Local Storage → apexdoc_device_id.
