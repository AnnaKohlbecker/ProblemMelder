import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { Table } from '~/shared/enums/Table'
import { ProblemCategoryFormData } from '~/views/Management/Categories/types/ProblemCategoryFormData'

export const useUpsertProblemCategoryMutation = () => {
    const mutationFn = useCallback(async (data: ProblemCategoryFormData) => {
        return await supabase.from(Table.ProblemCategories).upsert(data).throwOnError()
    }, [])

    return useMutation({
        mutationKey: ['upsertProblemCategoryMutation'],
        mutationFn,
    })
}
