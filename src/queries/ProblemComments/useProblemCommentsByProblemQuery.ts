import { useQuery } from '@tanstack/react-query'
import { isNil } from 'lodash'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { Table } from '~/shared/enums/Table'
import { CommentWithUserData } from '~/shared/types/CommentWithUserData'

type Props = {
    problemId: number | undefined
}

export const useProblemCommentsByProblemQuery = ({ problemId }: Props) => {
    const queryFn = useCallback(async () => {
        const { data: comments } = await supabase
            .from(Table.ProblemComments)
            .select(`*, ${Table.UserData}(*)`)
            .eq('problemId', problemId)
            .order('timestamp')
            .throwOnError()

        return comments
    }, [problemId])

    return useQuery<CommentWithUserData[]>({
        queryKey: ['commentsByProblemQuery', problemId],
        queryFn,
        enabled: !isNil(problemId),
    })
}
