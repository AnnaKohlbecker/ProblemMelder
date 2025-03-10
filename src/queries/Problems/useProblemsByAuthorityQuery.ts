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

        const { data: Problems } = await supabase
            .from('Problems')
            .select('*')
            .eq('authorityId', authorityId)
            .throwOnError()

        return Problems
    }, [authorityId])

    return useQuery({
        queryKey: ['ProblemByAuthorityQuery', authorityId],
        queryFn,
        enabled: !isNil(authorityId),
    })
}
