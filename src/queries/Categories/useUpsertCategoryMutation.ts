import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { Table } from '~/shared/enums/Table'
import { ProblemCategoryFormData } from '~/views/Management/Categories/types/ProblemCategoryFormData'

export const useUpsertCategoryMutation = () => {
    const mutationFn = useCallback(async (data: ProblemCategoryFormData) => {
        return await supabase.from(Table.Categories).upsert(data).throwOnError()
    }, [])

    return useMutation({
        mutationKey: ['upsertCategoryMutation'],
        mutationFn,
    })
}
