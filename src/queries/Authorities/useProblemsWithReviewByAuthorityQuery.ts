import { useQuery } from '@tanstack/react-query'
import { isNil } from 'lodash'
import { useCallback } from 'react'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { supabase } from '~/supabase'

type Props = {
    authorityId: number | undefined
}

export const useProblemsWithReviewByAuthorityQuery = ({ authorityId }: Props) => {
    const queryFn = useCallback(async () => {
        if (isNil(authorityId)) return null

        const response = await supabase
            .from('Problems')
            .select('*, SanitizedProblemReviews(*)')
            .eq('authorityId', authorityId)
            .eq('status', ProblemStatus.Done)
            .throwOnError()

        return response.data
    }, [authorityId])

    return useQuery({
        queryKey: ['problemsWithReviewByAuthorityQuery'],
        queryFn,
        enabled: !isNil(authorityId),
    })
}
