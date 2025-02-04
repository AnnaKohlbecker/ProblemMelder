import { useQuery } from '@tanstack/react-query'
import { Dictionary } from 'lodash'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { Table } from '~/shared/enums/Table'
import { Problem } from '~/shared/models/Problem'
import { ProblemComment } from '~/shared/models/ProblemComment'

type Props = {
    problems: Problem[] | undefined
}

export const useProblemCommentsByProblemsQuery = ({ problems }: Props) => {
    const queryFn = useCallback(async () => {
        const problemCommentsByProblemId: Record<string, ProblemComment[]> = {}

        const commentsPromises = (problems ?? []).map(async (problem) => {
            const { data: comments, error } = await supabase
                .from(Table.ProblemComments)
                .select('*')
                .eq('problemId', problem.id)

            if (error) {
                throw error
            }

            return { problemId: problem.id.toString(), comments: comments || [] }
        })

        const commentsResults = await Promise.all(commentsPromises)

        commentsResults.forEach(({ problemId, comments }) => {
            problemCommentsByProblemId[problemId] = comments
        })

        return problemCommentsByProblemId as Dictionary<ProblemComment[]>
    }, [problems])

    return useQuery<Dictionary<ProblemComment[]>>({
        queryKey: ['problemCommentsByProblemQuery', problems],
        queryFn,
    })
}
