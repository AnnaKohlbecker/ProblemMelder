import { useMutation } from '@tanstack/react-query'
import { isNil } from 'lodash'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { useAuth } from '~/shared/context/AuthContext'
import { Table } from '~/shared/enums/Table'

type Payload = {
    content: string
    problemId: number
}

export const useCreateProblemCommentMutation = () => {
    const { session } = useAuth()

    const mutationFn = useCallback(
        async ({ content, problemId }: Payload) => {
            if (isNil(session?.user))
                throw new Error('User is not logged in -> should not be allowed to comment.')

            await supabase
                .from(Table.ProblemComments)
                .insert({
                    userId: session.user.id,
                    problemId,
                    content,
                })
                .throwOnError()
        },
        [session?.user],
    )

    return useMutation({
        mutationKey: ['createCommentMutation'],
        mutationFn,
    })
}
