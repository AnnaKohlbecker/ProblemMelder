import { useQuery } from '@tanstack/react-query'
import { isNil } from 'lodash'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { Table } from '~/shared/enums/Table'
import { UserData } from '~/shared/models/UserData'

type Props = {
    userId: string | undefined
}

export const useUserByIdQuery = ({ userId }: Props) => {
    const queryFn = useCallback(async () => {
        const response = await supabase
            .from(Table.UserData)
            .select('*')
            .eq('userId', userId)
            .single()
            .throwOnError()

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore because supabase typings are incorrect
        return response.data as UserData
    }, [userId])

    return useQuery<UserData>({
        queryKey: ['userByIdQuery', userId],
        queryFn,
        enabled: !isNil(userId),
    })
}
