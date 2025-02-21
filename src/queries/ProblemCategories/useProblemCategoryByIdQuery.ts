import { useQuery } from '@tanstack/react-query'
import { isNil } from 'lodash'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { Table } from '~/shared/enums/Table'
import { ProblemCategory } from '~/shared/models/ProblemCategory'

type Props = {
    categoryId: number | undefined
}

export const useProblemCategoryByIdQuery = ({ categoryId }: Props) => {
    const queryFn = useCallback(async () => {
        const response = await supabase
            .from(Table.ProblemCategories)
            .select('*')
            .eq('id', categoryId)
            .single()
            .throwOnError()

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore because supabase typings are incorrect
        return response.data as ProblemCategory
    }, [categoryId])

    return useQuery<ProblemCategory>({
        queryKey: ['problemCategoryByIdQuery', categoryId],
        queryFn,
        enabled: !isNil(categoryId),
    })
}
