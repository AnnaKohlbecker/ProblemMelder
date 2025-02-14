import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { Table } from '~/shared/enums/Table'

export const useDeleteProblemCategoryMutation = () => {
    const mutationFn = useCallback(async (id: number) => {
        return await supabase.from(Table.ProblemCategories).delete().eq('id', id).throwOnError()
    }, [])

    return useMutation({
        mutationKey: ['deleteProblemCategoryMutation'],
        mutationFn,
    })
}
