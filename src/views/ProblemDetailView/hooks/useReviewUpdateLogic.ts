import { isNil } from 'lodash'
import { useCallback } from 'react'
import { useUpsertProblemReviewMutation } from '~/queries/ProblemReviews/useUpsertProblemReviewQuery'
import { ProblemReview } from '~/supabase/types'

type Props = {
    userId: string | undefined
    problemId: number
    userReview: ProblemReview | undefined | null
    refetch: () => void
}

export const useReviewUpdateLogic = ({ problemId, userId, userReview, refetch }: Props) => {
    const { mutate: upsertReview } = useUpsertProblemReviewMutation()

    const onStarRating = useCallback(
        (rating: number) => {
            if (isNil(userId)) return

            if (isNil(userReview))
                upsertReview(
                    {
                        id: 0,
                        userId,
                        problemId,
                        stars: rating,
                        helpful: null,
                        importance: null,
                    },
                    {
                        onSuccess: () => {
                            refetch()
                        },
                    },
                )
            else
                upsertReview(
                    {
                        ...userReview,
                        stars: rating,
                    },
                    {
                        onSuccess: () => {
                            refetch()
                        },
                    },
                )
        },
        [problemId, refetch, upsertReview, userId, userReview],
    )

    const onImportanceRating = useCallback(
        (rating: number) => {
            if (isNil(userId)) return

            if (isNil(userReview))
                upsertReview(
                    {
                        id: 0,
                        userId,
                        problemId,
                        importance: rating,
                        stars: null,
                        helpful: null,
                    },
                    {
                        onSuccess: () => {
                            refetch()
                        },
                    },
                )
            else
                upsertReview(
                    {
                        ...userReview,
                        importance: rating,
                    },
                    {
                        onSuccess: () => {
                            refetch()
                        },
                    },
                )
        },
        [problemId, refetch, upsertReview, userId, userReview],
    )

    const onHelpful = useCallback(
        (helpful: boolean | null) => {
            if (isNil(userId)) return

            if (isNil(userReview))
                upsertReview(
                    {
                        id: 0,
                        userId,
                        problemId,
                        helpful,
                        stars: null,
                        importance: null,
                    },
                    {
                        onSuccess: () => {
                            refetch()
                        },
                    },
                )
            else
                upsertReview(
                    {
                        ...userReview,
                        helpful,
                    },
                    {
                        onSuccess: () => {
                            refetch()
                        },
                    },
                )
        },
        [problemId, refetch, upsertReview, userId, userReview],
    )

    return {
        onStarRating,
        onImportanceRating,
        onHelpful,
    }
}
