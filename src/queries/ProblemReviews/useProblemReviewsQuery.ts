import { useQuery } from '@tanstack/react-query'
import { isNil } from 'lodash'
import { useCallback } from 'react'
import { supabase } from '~/supabase'

type Props = {
    problemId: number
}

export const useProblemReviewsQuery = ({ problemId }: Props) => {
    const queryFn = useCallback(async () => {
        const response = await supabase
            .from('SanitizedProblemReviews')
            .select('*')
            .eq('problemId', problemId)
            .throwOnError()

        return response.data
    }, [problemId])

    return useQuery({
        queryKey: ['problemReviewsQuery', problemId],
        queryFn,
        enabled: !isNil(problemId),
    })
}
