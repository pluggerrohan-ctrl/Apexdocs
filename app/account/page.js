import { createClient } from '../../lib/supabase/server'
import { createAdminClient } from '../../lib/supabase/admin'
import AccountView from './view'

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data: existing } = await supabase
      .from('profiles')
      .select('email,display_name,credits,created_at,updated_at')
      .eq('user_id', user.id)
      .maybeSingle()

    if (existing) {
      profile = existing
    } else {
      // Profile doesn't exist (user signed up before trigger was added)
      // Create it using admin client to bypass RLS
      try {
        const admin = createAdminClient()
        const { data: created } = await admin
          .from('profiles')
          .insert({
            user_id: user.id,
            email: user.email,
            display_name: user.user_metadata?.full_name || user.user_metadata?.name || user.email,
          })
          .select('email,display_name,credits,created_at,updated_at')
          .single()
        profile = created
      } catch (err) {
        console.error('[account/page] failed to create profile:', err)
      }
    }
  }

  return <AccountView user={user} profile={profile} />
}
