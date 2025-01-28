import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { Table } from '~/shared/enums/Table'
import { Problem } from '~/shared/types/Problem'

export const useProblemsQuery = () => {
    const queryFn = useCallback(async () => {
        const response = await supabase.from(Table.Problems).select('*').throwOnError()

        return response.data as Problem[]
    }, [])

    return useQuery({
        queryKey: ['problemsQuery'],
        queryFn,
    })
}
