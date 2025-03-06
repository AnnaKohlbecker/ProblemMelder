import { useMutation } from '@tanstack/react-query'
import { isNil } from 'lodash'
import { useCallback } from 'react'
import { useAuth } from '~/shared/context/AuthContext'
import { supabase } from '~/supabase'

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
                .from('ProblemComments')
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
        mutationKey: ['createProblemCommentMutation'],
        mutationFn,
    })
}
