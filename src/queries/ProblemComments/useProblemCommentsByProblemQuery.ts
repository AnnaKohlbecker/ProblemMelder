import { useQuery } from '@tanstack/react-query'
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
        if (problems?.length === 0) return {}

        const problemIds = (problems ?? []).map((problem) => problem.id.toString())

        const { data: comments } = await supabase
            .from(Table.ProblemComments)
            .select('*')
            .in('problemId', problemIds)
            .throwOnError()

        const commentsByProblem: Record<number, ProblemComment[]> = {}
        comments.forEach((comment) => {
            const comments = commentsByProblem[comment.problemId] ?? []

            commentsByProblem[comment.problemId] = [...comments, comment]
        })

        return commentsByProblem
    }, [problems])

    return useQuery<Record<number, ProblemComment[]>>({
        queryKey: ['problemCommentsByProblemQuery', problems],
        queryFn,
    })
}
