import { useQuery } from '@tanstack/react-query'
import { isNil } from 'lodash'
import { useCallback } from 'react'
import { supabase } from '~/supabase'

export const useUsersByAuthorityQuery = (authorityId: number | undefined) => {
    const queryFn = useCallback(async () => {
        if (isNil(authorityId)) return null

        const response = await supabase
            .from('UserData')
            .select('*')
            .eq('authorityId', authorityId)
            .throwOnError()

        return response.data
    }, [authorityId])

    return useQuery({
        queryKey: ['usersByAuthorityQuery', authorityId],
        queryFn,
        enabled: !isNil(authorityId),
    })
}
