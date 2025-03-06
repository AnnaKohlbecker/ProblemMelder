import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/supabase'

export const useAuthoritiesQuery = () => {
    const queryFn = useCallback(async () => {
        const { data } = await supabase.from('Authorities').select('*').order('id').throwOnError()

        return data
    }, [])

    return useQuery({
        queryKey: ['authoritiesQuery'],
        queryFn,
    })
}
