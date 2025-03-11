import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/supabase'
import { UserData } from '~/supabase/types'

export const useUpdateUserDataMutation = () => {
    const mutationFn = useCallback(async (userData: UserData) => {
        return await supabase
            .from('UserData')
            .update(userData)
            .eq('userId', userData.userId)
            .throwOnError()
    }, [])

    return useMutation({
        mutationKey: ['updateUserDataMutation'],
        mutationFn,
    })
}
