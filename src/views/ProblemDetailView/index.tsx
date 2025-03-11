import { isNil } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { BackHandler, StyleSheet, View } from 'react-native'
import { Card, Icon, IconButton, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { useCategoriesQuery } from '~/queries/Categories/useCategoriesQuery'
import { useProblemCommentsByProblemQuery } from '~/queries/ProblemComments/useProblemCommentsByProblemQuery'
import { globalStyles } from '~/shared/constants/globalStyles'
import { problemStatusToIconAndColor } from '~/shared/helpers/ProblemStatusToIconAndColor'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import { Problem } from '~/supabase/types'
import ProblemComments from '~/views/ProblemDetailView/components/ProblemComments'
import ProblemDetails from '~/views/ProblemDetailView/components/ProblemDetails'
import ProblemRating from '~/views/ProblemDetailView/components/ProblemRating'
import ProblemReactivation from '~/views/ProblemDetailView/components/ProblemReactivation'
import ProblemReview from '~/views/ProblemDetailView/components/ProblemReview'
import { ProblemDetailViewContent } from '~/views/ProblemDetailView/enums/ProblemDetailViewContent'
import { useProblemPermissions } from '~/views/ProblemDetailView/hooks/useProblemPermissions'

type Props = {
    problem: Problem
    onClose: () => void
}

const ProblemDetailView = ({ problem, onClose }: Props) => {
    const { canReactivate, canReview } = useProblemPermissions({ problem })

    const [currentContent, setCurrentContent] = useState<ProblemDetailViewContent>(
        ProblemDetailViewContent.Details,
    )

    const { data: categories, isLoading: categoriesLoading } = useCategoriesQuery()
    const category = useMemo(
        () => categories?.find((c) => c.id === problem.categoryId),
        [categories, problem.categoryId],
    )

    const {
        data: comments,
        isLoading: commentsLoading,
        refetch: refetchComments,
    } = useProblemCommentsByProblemQuery({
        problemId: problem.id,
    })

    const { icon, color } = useMemo(
        () => problemStatusToIconAndColor(problem.status),
        [problem.status],
    )

    const goTo = useCallback(
        (view: ProblemDetailViewContent) => () => {
            setCurrentContent(view)
        },
        [],
    )

    useEffect(() => {
        const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
            onClose()
            return true
        })

        return () => {
            subscription.remove()
        }
    }, [onClose])

    if (categoriesLoading || commentsLoading || isNil(category)) return <LoadingSpinner />

    return (
        <View style={[StyleSheet.absoluteFillObject, globalStyles.dialogWrapper]}>
            <Card style={globalStyles.dialogCard}>
                <View style={globalStyles.cardHeader}>
                    <Icon
                        source={icon}
                        color={color}
                        size={RFValue(30)}
                    />
                    <Text
                        style={globalStyles.cardHeaderTitle}
                        numberOfLines={2}
                        ellipsizeMode='tail'
                    >
                        {problem.title}
                    </Text>

                    <View style={globalStyles.cardHeaderButtons}>
                        {currentContent === ProblemDetailViewContent.Details && (
                            <>
                                {canReview && (
                                    <IconButton
                                        icon='pencil'
                                        onPress={goTo(ProblemDetailViewContent.Review)}
                                        mode='contained'
                                    />
                                )}
                                {!canReview && canReactivate && (
                                    <IconButton
                                        icon='refresh'
                                        onPress={goTo(ProblemDetailViewContent.Reactivation)}
                                        mode='contained'
                                    />
                                )}
                            </>
                        )}
                        <IconButton
                            icon='close'
                            onPress={onClose}
                            mode='contained'
                        />
                    </View>
                </View>

                {currentContent === ProblemDetailViewContent.Details && (
                    <ProblemDetails
                        problem={problem}
                        category={category}
                        comments={comments ?? []}
                        goTo={goTo}
                    />
                )}
                {currentContent === ProblemDetailViewContent.Comments && (
                    <ProblemComments
                        problem={problem}
                        onClose={goTo(ProblemDetailViewContent.Details)}
                        onSend={refetchComments}
                        comments={comments ?? []}
                    />
                )}
                {currentContent === ProblemDetailViewContent.Review && (
                    <ProblemReview
                        problem={problem}
                        onClose={goTo(ProblemDetailViewContent.Details)}
                        onSubmit={onClose}
                        categories={categories ?? []}
                    />
                )}
                {currentContent === ProblemDetailViewContent.Reactivation && (
                    <ProblemReactivation
                        problem={problem}
                        onClose={goTo(ProblemDetailViewContent.Details)}
                        onSubmit={onClose}
                    />
                )}
                {currentContent === ProblemDetailViewContent.Rating && (
                    <ProblemRating
                        problem={problem}
                        onClose={goTo(ProblemDetailViewContent.Details)}
                    />
                )}
            </Card>
        </View>
    )
}

export default ProblemDetailView
