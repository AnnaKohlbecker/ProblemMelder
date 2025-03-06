import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/supabase'

export const useCategoriesQuery = () => {
    const queryFn = useCallback(async () => {
        const response = await supabase.from('Categories').select('*').order('id').throwOnError()

        return response.data
    }, [])

    return useQuery({
        queryKey: ['categoriesQuery'],
        queryFn,
    })
}
