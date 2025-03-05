import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/supabase'
import { AuthorityFormData } from '~/views/Management/Authorities/types/AuthorityFormData'

export const useUpsertAuthorityMutation = () => {
    const mutationFn = useCallback(async (authority: AuthorityFormData) => {
        return await supabase.from('Authorities').upsert(authority).throwOnError()
    }, [])

    return useMutation({
        mutationKey: ['deleteAuthorityMutation'],
        mutationFn,
    })
}
