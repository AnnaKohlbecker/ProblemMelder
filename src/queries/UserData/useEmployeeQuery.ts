import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { Role } from '~/shared/enums/Role'
import { Table } from '~/shared/enums/Table'
import { User } from '~/shared/models/User'

export const useEmployeeQuery = () => {
    const queryFn = useCallback(async () => {
        const response = await supabase
            .from(Table.UserData)
            .select('*,Roles(name))')
            .in('Roles.name', [Role.Admin, Role.Manager])
            .order('name')
            .throwOnError()

        return response.data as unknown as User[]
    }, [])

    return useQuery<User[]>({
        queryKey: ['employeeQuery'],
        queryFn,
    })
}
