import { createBrowserClient } from '@supabase/ssr'
import { Database } from "@train360-corp/dms/types/supabase/types.gen";

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
