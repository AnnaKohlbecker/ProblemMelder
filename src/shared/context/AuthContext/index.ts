import { Session } from '@supabase/supabase-js'
import { createContext, useContext } from 'react'
import { Role } from '~/shared/enums/Role'

type AuthContextProps = {
    session: Session | undefined
    role: Role | undefined
    isLoading: boolean
    signOut: () => void
}

export const AuthContext = createContext<AuthContextProps>({
    session: undefined,
    role: undefined,
    isLoading: false,
    signOut: () => {
        //
    },
})

/**
 * Provides access to the current session and user information.
 */
export const useAuth = () => useContext(AuthContext)
