import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { Table } from '~/shared/enums/Table'
import { ProblemCategory } from '~/shared/models/ProblemCategory'

export const useProblemCategoriesQuery = () => {
    const queryFn = useCallback(async () => {
        const response = await supabase
            .from(Table.ProblemCategories)
            .select('*')
            .order('id')
            .throwOnError()

        return response.data
    }, [])

    return useQuery<ProblemCategory[]>({
        queryKey: ['problemCategoriesQuery'],
        queryFn,
    })
}
