import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { Table } from '~/shared/enums/Table'

export const useDeleteAuthorityMutation = () => {
    const mutationFn = useCallback(async (authorityId: number) => {
        return await supabase.from(Table.Authorities).delete().eq('id', authorityId).throwOnError()
    }, [])

    return useMutation({
        mutationKey: ['deleteAuthorityMutation'],
        mutationFn,
    })
}
