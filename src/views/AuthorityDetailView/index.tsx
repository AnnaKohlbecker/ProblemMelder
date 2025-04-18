import { isNil } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { BackHandler, StyleSheet, View } from 'react-native'
import { Card, IconButton, Text } from 'react-native-paper'
import { useProblemsWithReviewByAuthorityQuery } from '~/queries/Authorities/useProblemsWithReviewByAuthorityQuery'
import { useCategoriesByAuthorityQuery } from '~/queries/Categories/useCategoriesByAuthorityQuery'
import { useProblemsByAuthorityQuery } from '~/queries/Problems/useProblemsByAuthorityQuery'
import { globalStyles } from '~/shared/constants/globalStyles'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import { Authority } from '~/supabase/types'
import AuthorityDetails from '~/views/AuthorityDetailView/components/AuthorityDetails'
import AuthorityReview from '~/views/AuthorityDetailView/components/AuthorityReview'
import { AuthorityDetailViewContent } from '~/views/AuthorityDetailView/enums/AuthorityDetailViewContent'

type Props = {
    authority: Authority
    onClose: () => void
}

const AuthorityDetailView = ({ authority, onClose }: Props) => {
    const [currentContent, setCurrentContent] = useState<AuthorityDetailViewContent>(
        AuthorityDetailViewContent.Details,
    )

    const { data: problems, isLoading: problemsLoading } = useProblemsByAuthorityQuery({
        authorityId: authority.id,
    })

    const { data: problemsWithReview, isLoading: problemsWithReviewLoading } =
        useProblemsWithReviewByAuthorityQuery({
            authorityId: authority.id,
        })

    const averageRating = useMemo(() => {
        let ratingSum = 0
        let ratingCount = 0

        problemsWithReview?.forEach((problem) => {
            problem.SanitizedProblemReviews.forEach((review) => {
                if (isNil(review.stars)) return

                ratingSum += review.stars
                ratingCount++
            })
        })

        return ratingSum / ratingCount
    }, [problemsWithReview])

    const { data: categories, isLoading: categoriesLoading } = useCategoriesByAuthorityQuery({
        authorityId: authority.id,
    })

    useEffect(() => {
        const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
            onClose()
            return true
        })

        return () => {
            subscription.remove()
        }
    }, [onClose])

    const goTo = useCallback(
        (content: AuthorityDetailViewContent) => () => {
            setCurrentContent(content)
        },
        [],
    )

    if (categoriesLoading || problemsWithReviewLoading || problemsLoading) return <LoadingSpinner />

    return (
        <View style={[StyleSheet.absoluteFillObject, globalStyles.dialogWrapper]}>
            <Card style={globalStyles.dialogCard}>
                <View style={globalStyles.cardHeader}>
                    <Text
                        style={globalStyles.cardHeaderTitle}
                        numberOfLines={2}
                        ellipsizeMode='tail'
                    >
                        {authority.name}
                    </Text>

                    <View style={globalStyles.cardHeaderButtons}>
                        <IconButton
                            icon='close'
                            onPress={onClose}
                            mode='contained'
                        />
                    </View>
                </View>
                {currentContent === AuthorityDetailViewContent.Details && (
                    <AuthorityDetails
                        averageRating={averageRating}
                        categories={categories ?? []}
                        problems={problems ?? []}
                        onReviewPress={goTo(AuthorityDetailViewContent.Review)}
                    />
                )}
                {currentContent === AuthorityDetailViewContent.Review && (
                    <AuthorityReview
                        problems={problemsWithReview ?? []}
                        categories={categories ?? []}
                        onClose={goTo(AuthorityDetailViewContent.Details)}
                    />
                )}
            </Card>
        </View>
    )
}

export default AuthorityDetailView
