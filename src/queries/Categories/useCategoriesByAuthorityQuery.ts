import { useQuery } from '@tanstack/react-query'
import { isNil } from 'lodash'
import { useCallback } from 'react'
import { supabase } from '~/supabase'

type Props = {
    authorityId: number | undefined
}

export const useCategoriesByAuthorityQuery = ({ authorityId }: Props) => {
    const queryFn = useCallback(async () => {
        if (isNil(authorityId)) return null

        const { data: categories } = await supabase
            .from('Categories')
            .select('*')
            .eq('authorityId', authorityId)
            .throwOnError()

        return categories
    }, [authorityId])

    return useQuery({
        queryKey: ['categoryByAuthorityQuery', authorityId],
        queryFn,
        enabled: !isNil(authorityId),
    })
}
