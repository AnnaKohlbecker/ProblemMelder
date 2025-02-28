import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { Table } from '~/shared/enums/Table'
import { Category } from '~/shared/models/Category'

export const useCategoriesQuery = () => {
    const queryFn = useCallback(async () => {
        const response = await supabase
            .from(Table.Categories)
            .select('*')
            .order('id')
            .throwOnError()

        return response.data
    }, [])

    return useQuery<Category[]>({
        queryKey: ['categoriesQuery'],
        queryFn,
    })
}
