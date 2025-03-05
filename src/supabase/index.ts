import { supabaseAnonKey, supabaseUrl } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { Database } from '~/supabase/models'

/**
 * Initializes and exports a Supabase client instance.
 *
 * The client is configured with the following options:
 * - `storage`: Uses AsyncStorage for storing authentication tokens.
 * - `autoRefreshToken`: Automatically refreshes the authentication token.
 * - `persistSession`: Persists the session across app restarts.
 * - `detectSessionInUrl`: Disables session detection in the URL.
 */
export const supabase = createClient<Database>(
    process.env.SUPABASE_URL ?? supabaseUrl,
    process.env.SUPABASE_ANON_KEY ?? supabaseAnonKey,
    {
        auth: {
            storage: AsyncStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    },
)
