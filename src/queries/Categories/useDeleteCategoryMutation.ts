import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/supabase'

export const useDeleteCategoryMutation = () => {
    const mutationFn = useCallback(async (id: number) => {
        return await supabase.from('Categories').delete().eq('id', id).throwOnError()
    }, [])

    return useMutation({
        mutationKey: ['deleteCategoryMutation'],
        mutationFn,
    })
}
