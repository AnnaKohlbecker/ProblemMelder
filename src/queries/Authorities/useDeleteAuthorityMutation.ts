import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/supabase'

export const useDeleteAuthorityMutation = () => {
    const mutationFn = useCallback(async (authorityId: number) => {
        return await supabase.from('Authorities').delete().eq('id', authorityId).throwOnError()
    }, [])

    return useMutation({
        mutationKey: ['deleteAuthorityMutation'],
        mutationFn,
    })
}
