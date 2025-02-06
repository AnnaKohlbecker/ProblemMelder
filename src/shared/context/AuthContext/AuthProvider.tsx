import { Session } from '@supabase/supabase-js'
import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, AppState } from 'react-native'
import { useRoleByUserQuery } from '~/queries/UserData/useRoleByUserQuery'
import { supabase } from '~/services/supabase'
import { AuthContext } from '~/shared/context/AuthContext'
import { Role as RoleEnum } from '~/shared/enums/Role'

type Props = PropsWithChildren

/**
 * Keeps the authentication state in sync while the app is in the foreground.
 * This listener should only be registered once at startup.
 */
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})

/**
 * Provides the most important logic related to authentication and session management with Supabase.
 * The authentication state can be accessed using the `useAuth()` hook.
 */
const AuthProvider = ({ children }: Props) => {
    const [sessionLoading, setSessionLoading] = useState(true)
    const [session, setSession] = useState<Session>()

    /**
     * Signs out the current user and clears the session.
     */
    const signOut = useCallback(() => {
        setSession(undefined)
        supabase.auth.signOut()
    }, [])

    /**
     * Fetches the role of the current user.
     */
    const {
        data: userRole,
        error: roleError,
        isLoading: roleLoading,
    } = useRoleByUserQuery({ userId: session?.user.id })

    /**
     * Callback to check whether the current user has a specific role
     */
    const hasRole = useCallback(
        (role: RoleEnum) => {
            return userRole?.name === role
        },
        [userRole?.name],
    )

    /**
     * Fetches the user's session from the database and ensures that session changes are propagated correctly.
     */
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session ?? undefined)
            setSessionLoading(false)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session ?? undefined)
        })
    }, [])

    /**
     * Error handler
     */
    useEffect(() => {
        if (!roleError) return

        Alert.alert('Fehler', 'Ein unerwarteter Fehler ist aufgetreten.')
        // eslint-disable-next-line no-console
        console.error(roleError)

        // Logout user to force a new login and prevent further errors
        setSession(undefined)
    }, [roleError])

    const isLoading = useMemo(() => sessionLoading || roleLoading, [sessionLoading, roleLoading])

    return (
        <AuthContext.Provider value={{ session, role: userRole, isLoading, signOut, hasRole }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
