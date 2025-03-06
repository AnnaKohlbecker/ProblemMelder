import { useQuery } from '@tanstack/react-query'
import { isNil } from 'lodash'
import { useCallback } from 'react'
import { supabase } from '~/supabase'

type Props = {
    userId: string | undefined
    problemId: number
}

export const useUserProblemReviewQuery = ({ problemId, userId }: Props) => {
    const queryFn = useCallback(async () => {
        if (isNil(userId)) return null

        const response = await supabase
            .from('ProblemReviews')
            .select('*')
            .eq('problemId', problemId)
            .eq('userId', userId)
            .maybeSingle()
            .throwOnError()

        return response.data
    }, [problemId, userId])

    return useQuery({
        queryKey: ['userProblemReviewQuery', problemId, userId],
        queryFn,
        enabled: !isNil(userId),
    })
}
