import { useQuery } from '@tanstack/react-query'
import { isNil } from 'lodash'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { Table } from '~/shared/enums/Table'
import { ProblemComment } from '~/shared/models/ProblemComment'

type Props = {
    problemId: number | undefined
}

export const useProblemCommentsByProblemQuery = ({ problemId }: Props) => {
    const queryFn = useCallback(async () => {
        const { data: comments } = await supabase
            .from(Table.ProblemComments)
            .select('*')
            .eq('problemId', problemId)
            .throwOnError()

        return comments
    }, [problemId])

    return useQuery<ProblemComment[]>({
        queryKey: ['problemCommentsByProblemQuery', problemId],
        queryFn,
        enabled: !isNil(problemId),
    })
}
