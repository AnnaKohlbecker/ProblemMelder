import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { Table } from '~/shared/enums/Table'
import { Problem } from '~/shared/types/Problem'

export const useProblemsQuery = () => {
    const queryFn = useCallback(async () => {
        const { data } = await supabase
            .from(Table.Problems)
            .select('*')
            .order('title', { ascending: true })
            .throwOnError()

        return data ?? []
    }, [])

    return useQuery<Problem[]>({
        queryKey: ['problemsQuery'],
        queryFn,
    })
}
