import { useQuery } from '@tanstack/react-query'
import { isNil } from 'lodash'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { Table } from '~/shared/enums/Table'
import { Role } from '~/shared/models/Role'

type Props = {
    userId: string | undefined
}

export const useRoleByUserQuery = ({ userId }: Props) => {
    const queryFn = useCallback(async () => {
        const response = await supabase
            .from(Table.UserData)
            .select('role(*)')
            .eq('userId', userId)
            .limit(1)
            .throwOnError()

        return (response.data[0]?.role ?? null) as unknown as Role
    }, [userId])

    return useQuery<Role>({
        queryKey: ['roleByUserQuery', userId],
        queryFn,
        enabled: !isNil(userId),
    })
}
