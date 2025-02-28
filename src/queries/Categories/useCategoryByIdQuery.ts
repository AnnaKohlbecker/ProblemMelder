import { useQuery } from '@tanstack/react-query'
import { isNil } from 'lodash'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { Table } from '~/shared/enums/Table'
import { Category } from '~/shared/models/Category'

type Props = {
    categoryId: number | undefined
}

export const useCategoryByIdQuery = ({ categoryId }: Props) => {
    const queryFn = useCallback(async () => {
        const response = await supabase
            .from(Table.Categories)
            .select('*')
            .eq('id', categoryId)
            .single()
            .throwOnError()

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore because supabase typings are incorrect
        return response.data as Category
    }, [categoryId])

    return useQuery<Category>({
        queryKey: ['categoryByIdQuery', categoryId],
        queryFn,
        enabled: !isNil(categoryId),
    })
}
