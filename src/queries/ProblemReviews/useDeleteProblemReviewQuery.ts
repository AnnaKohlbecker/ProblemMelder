import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/supabase'

export const useDeleteProblemReviewMutation = () => {
    const mutationFn = useCallback(async (id: number) => {
        await supabase.from('ProblemReviews').delete().eq('id', id).throwOnError()
    }, [])

    return useMutation({
        mutationKey: ['deleteProblemReviewMutation'],
        mutationFn,
    })
}
