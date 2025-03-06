import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/supabase'

export const useRolesQuery = () => {
    const queryFn = useCallback(async () => {
        const { data } = await supabase.from('Roles').select('*').throwOnError()

        return data
    }, [])

    return useQuery({
        queryKey: ['rolesQuery'],
        queryFn,
    })
}
