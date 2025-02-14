import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { Table } from '~/shared/enums/Table'
import { Role } from '~/shared/models/Role'

export const useRolesQuery = () => {
    const queryFn = useCallback(async () => {
        const { data } = await supabase.from(Table.Roles).select('*').throwOnError()

        return data
    }, [])

    return useQuery<Role[]>({
        queryKey: ['rolesQuery'],
        queryFn,
    })
}
