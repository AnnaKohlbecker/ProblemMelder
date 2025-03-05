import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { Role } from '~/shared/enums/Role'
import { supabase } from '~/supabase'

export const useEmployeeQuery = () => {
    const queryFn = useCallback(async () => {
        const response = await supabase
            .from('UserData')
            .select('*, Roles(name)')
            .in('Roles.name', [Role.Admin, Role.Manager])
            .order('name')
            .throwOnError()

        return response.data
    }, [])

    return useQuery({
        queryKey: ['employeeQuery'],
        queryFn,
    })
}
