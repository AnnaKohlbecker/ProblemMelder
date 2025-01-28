import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { Role } from '~/shared/enums/Role'
import { Table } from '~/shared/enums/Table'

type Props = {
    userID: string | undefined
}

export const useRoleByUserQuery = ({ userID }: Props) => {
    const queryFn = useCallback(async () => {
        const response = await supabase
            .from(Table.Users)
            .select('role(name)')
            .eq('userID', userID)
            .single()
            .throwOnError()

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore because supabase typings are incorrect
        return response.data?.role.name as Role
    }, [userID])

    return useQuery<Role>({
        queryKey: ['roleByUserQuery', userID],
        queryFn,
        enabled: !!userID,
    })
}
