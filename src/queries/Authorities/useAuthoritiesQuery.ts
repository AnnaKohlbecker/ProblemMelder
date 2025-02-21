import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { Table } from '~/shared/enums/Table'
import { Authority } from '~/shared/models/Authority'

export const useAuthoritiesQuery = () => {
    const queryFn = useCallback(async () => {
        const { data } = await supabase
            .from(Table.Authorities)
            .select('*')
            .order('id')
            .throwOnError()

        return data
    }, [])
    return useQuery<Authority[]>({
        queryKey: ['authoritiesQuery'],
        queryFn,
    })
}
