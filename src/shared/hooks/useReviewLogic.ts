import { isNil } from 'lodash'
import { useMemo } from 'react'
import { SanitizedProblemReview } from '~/supabase/types'

type Props = {
    reviews: SanitizedProblemReview[] | undefined
}

export const useReviewLogic = ({ reviews = [] }: Props) => {
    const [amountOfStars, stars] = useMemo(() => {
        const reviewsWithStars = reviews.filter((review) => !isNil(review.stars))

        const average =
            reviewsWithStars.reduce((acc, review) => acc + review.stars!, 0) /
            reviewsWithStars.length

        return [reviewsWithStars.length, average] as const
    }, [reviews])

    const [amountOfImportance, importance] = useMemo(() => {
        const reviewsWithImportance = reviews.filter((review) => !isNil(review.importance))

        const average =
            reviewsWithImportance.reduce((acc, review) => acc + review.importance!, 0) /
            reviewsWithImportance.length

        return [reviewsWithImportance.length, average] as const
    }, [reviews])

    const [helpful, unhelpful] = useMemo(() => {
        const helpfulReviews = reviews.filter((review) => review.helpful === true)
        const unhelpfulReviews = reviews.filter((review) => review.helpful === false)

        return [helpfulReviews.length, unhelpfulReviews.length] as const
    }, [reviews])

    return {
        stars,
        amountOfStars,
        importance,
        amountOfImportance,
        helpful,
        unhelpful,
    }
}
