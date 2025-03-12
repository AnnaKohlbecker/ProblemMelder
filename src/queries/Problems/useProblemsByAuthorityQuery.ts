import { useQuery } from '@tanstack/react-query'
import { isNil } from 'lodash'
import { useCallback } from 'react'
import { supabase } from '~/supabase'

type Props = {
    authorityId: number | undefined
}

export const useProblemsByAuthorityQuery = ({ authorityId }: Props) => {
    const queryFn = useCallback(async () => {
        if (isNil(authorityId)) return null

        const response = await supabase
            .from('Problems')
            .select('*')
            .eq('authorityId', authorityId)
            .throwOnError()

        return response.data
    }, [authorityId])

    return useQuery({
        queryKey: ['problemsByAuthorityQuery'],
        queryFn,
        enabled: !isNil(authorityId),
    })
}
