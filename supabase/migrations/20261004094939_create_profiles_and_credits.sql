/*
# Create profiles table and credit consumption function

## Purpose
This migration creates the core data structures needed for ApexDoc user authentication,
profile management, and credit tracking.

## New Tables
- `profiles`: One row per authenticated user, storing display name, email, and paid credit balance.
  - `user_id` (uuid, primary key, references auth.users) — the Supabase auth user ID
  - `email` (text, not null) — the user's email from auth
  - `display_name` (text, nullable) — friendly display name from OAuth metadata
  - `credits` (integer, not null, default 0) — paid credit balance
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())

## New Functions
- `handle_new_user()`: Trigger function that auto-creates a profile row when a new auth user is created.
- `consume_apexdoc_credit(p_user_id uuid)`: SECURITY DEFINER function that atomically decrements
  a user's credit balance by 1 and returns the remaining balance. Returns NULL if the user has 0 credits.

## Triggers
- `on_auth_user_created`: Fires AFTER INSERT on auth.users, calls `handle_new_user()` to auto-create profile.

## Security (RLS)
- RLS enabled on `profiles`.
- SELECT: authenticated users can read only their own profile.
- INSERT: authenticated users can insert only their own profile (user_id must match auth.uid()).
- UPDATE: authenticated users can update only their own profile.
- DELETE: authenticated users can delete only their own profile.
- The `consume_apexdoc_credit` function is SECURITY DEFINER so it can update credits
  without being blocked by RLS. It is callable only by authenticated users.

## Important Notes
1. The `handle_new_user` trigger means every new OAuth signup automatically gets a profile
   row with 0 credits — no client-side creation needed.
2. The `consume_apexdoc_credit` function is atomic — it won't decrement below 0.
3. The trigger is idempotent — if a profile already exists for the user, it won't duplicate.
*/

CREATE TABLE IF NOT EXISTS public.profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  display_name text,
  credits integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own profile" ON public.profiles;
CREATE POLICY "Users can delete own profile"
ON public.profiles FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Auto-create profile when a new auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', NEW.email)
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- Atomic credit consumption: decrement by 1, return remaining, or NULL if no credits
CREATE OR REPLACE FUNCTION public.consume_apexdoc_credit(p_user_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  remaining integer;
BEGIN
  SELECT credits INTO remaining FROM public.profiles WHERE user_id = p_user_id FOR UPDATE;
  IF remaining IS NULL OR remaining <= 0 THEN
    RETURN NULL;
  END IF;
  UPDATE public.profiles SET credits = credits - 1, updated_at = now() WHERE user_id = p_user_id;
  RETURN remaining - 1;
END;
$$;

GRANT EXECUTE ON FUNCTION public.consume_apexdoc_credit(uuid) TO authenticated;