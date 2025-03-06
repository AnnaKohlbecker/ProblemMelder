import { useQuery } from '@tanstack/react-query'
import { isNil } from 'lodash'
import { useCallback } from 'react'
import { supabase } from '~/supabase'

type Props = {
    problemId: number | undefined
}

export const useProblemCommentsByProblemQuery = ({ problemId }: Props) => {
    const queryFn = useCallback(async () => {
        if (isNil(problemId)) return null

        const { data: comments } = await supabase
            .from('ProblemComments')
            .select('*, UserData(*)')
            .eq('problemId', problemId)
            .order('timestamp')
            .throwOnError()

        return comments
    }, [problemId])

    return useQuery({
        queryKey: ['commentsByProblemQuery', problemId],
        queryFn,
        enabled: !isNil(problemId),
    })
}
