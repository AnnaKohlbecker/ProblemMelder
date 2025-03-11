import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/supabase'
import { UserData } from '~/supabase/types'

export const useUpdateUserDataMutation = () => {
    const mutationFn = useCallback(async (userData: UserData) => {
        return await supabase.from('UserData').upsert(userData).throwOnError()
    }, [])

    return useMutation({
        mutationKey: ['updateUserDataMutation'],
        mutationFn,
    })
}
