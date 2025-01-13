/**
 * Module declaration for '@env' which exports environment variables.
 *
 * This declaration is necessary because we are using TypeScript and importing
 * the .env file via react-native-env, which does not automatically generate types
 * via Babel.
 *
 * @module @env
 */

declare module '@env' {
    /**
     * The URL for the Supabase instance.
     */
    export const supabaseUrl: string

    /**
     * The anonymous public key for accessing the Supabase instance.
     */
    export const supabaseAnonKey: string
}
