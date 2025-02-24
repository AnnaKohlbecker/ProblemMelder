import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { Table } from '~/shared/enums/Table'

export const useDeleteCategoryMutation = () => {
    const mutationFn = useCallback(async (id: number) => {
        return await supabase.from(Table.Categories).delete().eq('id', id).throwOnError()
    }, [])

    return useMutation({
        mutationKey: ['deleteCategoryMutation'],
        mutationFn,
    })
}
