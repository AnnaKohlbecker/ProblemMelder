import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/supabase'
import { ProblemReview } from '~/supabase/types'

type Payload = Omit<ProblemReview, 'id'> & { id?: number }

export const useUpsertProblemReviewMutation = () => {
    const mutationFn = useCallback(async (review: Payload) => {
        await supabase.from('ProblemReviews').upsert(review).throwOnError()
    }, [])

    return useMutation({
        mutationKey: ['upsertProblemReviewMutation'],
        mutationFn,
    })
}
