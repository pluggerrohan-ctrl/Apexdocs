import { createClient } from '../../lib/supabase/server'
import AccountView from './view'

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = user ? await supabase.from('profiles').select('email,display_name,credits,created_at,updated_at').eq('user_id', user.id).maybeSingle() : { data: null }
  return <AccountView user={user} profile={profile} />
}
