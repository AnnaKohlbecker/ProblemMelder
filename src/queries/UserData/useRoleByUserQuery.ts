import { useQuery } from '@tanstack/react-query'
import { isNil } from 'lodash'
import { useCallback } from 'react'
import { supabase } from '~/supabase'

type Props = {
    userId: string | undefined
}

export const useRoleByUserQuery = ({ userId }: Props) => {
    const queryFn = useCallback(async () => {
        if (isNil(userId)) return null

        const response = await supabase
            .from('UserData')
            .select('Roles(*)')
            .eq('userId', userId)
            .single()
            .throwOnError()

        return response.data.Roles
    }, [userId])

    return useQuery({
        queryKey: ['roleByUserQuery', userId],
        queryFn,
        enabled: !isNil(userId),
    })
}
