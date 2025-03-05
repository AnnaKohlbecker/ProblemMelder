import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/supabase'
import { ProblemReview } from '~/supabase/types'

export const useUpsertProblemReviewMutation = () => {
    const mutationFn = useCallback(async (review: ProblemReview) => {
        await supabase.from('ProblemReviews').upsert(review).throwOnError()
    }, [])

    return useMutation({
        mutationKey: ['upsertProblemReviewMutation'],
        mutationFn,
    })
}
