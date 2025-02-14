import { Session } from '@supabase/supabase-js'
import { createContext, useContext } from 'react'
import { Role as RoleEnum } from '~/shared/enums/Role'
import { Role } from '~/shared/models/Role'

type AuthContextProps = {
    session: Session | undefined
    role: Role | undefined
    isLoading: boolean
    signOut: () => void
    hasRole: (role: RoleEnum) => boolean
}

export const AuthContext = createContext<AuthContextProps>({
    session: undefined,
    role: undefined,
    isLoading: false,
    signOut: () => {
        //
    },
    hasRole: () => {
        return false
    },
})

/**
 * Provides access to the current session and user information.
 */
export const useAuth = () => useContext(AuthContext)
