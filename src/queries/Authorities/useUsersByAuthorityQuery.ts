import { useQuery } from '@tanstack/react-query'
import { isNil } from 'lodash'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'

export const useUsersByAuthorityQuery = (authorityId: number | undefined) => {
    const queryFn = useCallback(async () => {
        const response = await supabase
            .from('userData')
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
