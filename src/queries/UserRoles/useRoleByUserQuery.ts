import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { Role } from '~/shared/enums/Role'
import { Table } from '~/shared/enums/Table'

type Props = {
    userId: string | undefined
}

export const useRoleByUserQuery = ({ userId }: Props) => {
    const queryFn = useCallback(async () => {
        const response = await supabase
            .from(Table.Users)
            .select('role(name)')
            .eq('userId', userId)
            .single()
            .throwOnError()

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore because supabase typings are incorrect
        return response.data?.role.name as Role
    }, [userId])

    return useQuery<Role>({
        queryKey: ['roleByUserQuery', userId],
        queryFn,
        enabled: !!userId,
    })
}
