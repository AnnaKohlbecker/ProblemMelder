import { useQuery } from '@tanstack/react-query'
import { isNil } from 'lodash'
import { useCallback } from 'react'
import { supabase } from '~/supabase'

type Props = {
    categoryId: number | undefined
}

export const useCategoryByIdQuery = ({ categoryId }: Props) => {
    const queryFn = useCallback(async () => {
        if (isNil(categoryId)) return null

        const response = await supabase
            .from('Categories')
            .select('*')
            .eq('id', categoryId)
            .single()
            .throwOnError()

        return response.data
    }, [categoryId])

    return useQuery({
        queryKey: ['categoryByIdQuery', categoryId],
        queryFn,
        enabled: !isNil(categoryId),
    })
}
