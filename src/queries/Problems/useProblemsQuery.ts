import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/supabase'

export const useProblemsQuery = () => {
    const queryFn = useCallback(async () => {
        const response = await supabase.from('Problems').select('*').order('date').throwOnError()

        return response.data
    }, [])

    return useQuery({
        queryKey: ['problemsQuery'],
        queryFn,
    })
}
