import { isNil } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { BackHandler, StyleSheet, View } from 'react-native'
import { Card, Icon, IconButton, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { useCategoriesQuery } from '~/queries/Categories/useCategoriesQuery'
import { useCategoryByIdQuery } from '~/queries/Categories/useCategoryByIdQuery'
import { useProblemCommentsByProblemQuery } from '~/queries/ProblemComments/useProblemCommentsByProblemQuery'
import { useUserByIdQuery } from '~/queries/UserData/useUserByIdQuery'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { Role } from '~/shared/enums/Role'
import { problemStatusToIconAndColor } from '~/shared/helpers/ProblemStatusToIconAndColor'
import { Problem } from '~/shared/models/Problem'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import ProblemComments from '~/views/ProblemDetailView/components/ProblemComments'
import ProblemDetails from '~/views/ProblemDetailView/components/ProblemDetails'
import ProblemReactivation from '~/views/ProblemDetailView/components/ProblemReactivation'
import ProblemReview from '~/views/ProblemDetailView/components/ProblemReview'
import { ProblemDetailViewContent } from '~/views/ProblemDetailView/enums/ProblemDetailViewContent'

type Props = {
    problem: Problem
    onClose: () => void
}

const styles = StyleSheet.create({
    card: {
        maxHeight: '80%',
        padding: 25,
        width: '90%',
    },
    closeButton: {
        position: 'absolute',
        right: -15,
        top: -15,
    },
    gapBetween: {
        gap: 10,
    },
    headingWrapper: {
        maxWidth: '70%',
        minWidth: '60%',
        paddingLeft: 10,
    },
    reviewButton: {
        position: 'absolute',
        right: 30,
        top: -15,
    },
    title: {
        fontSize: RFValue(16),
        fontWeight: 'bold',
        maxWidth: '100%',
    },
    wrapper: {
        alignItems: 'center',
        backgroundColor: colors.backdrop,
        elevation: 1000,
        justifyContent: 'center',
    },
})

const ProblemDetailView = ({ problem, onClose }: Props) => {
    const { session, hasRole } = useAuth()

    const { data: user, isLoading: userLoading } = useUserByIdQuery({ userId: session?.user.id })

    const { data: categories, isLoading: categoriesLoading } = useCategoriesQuery()

    const canReview = useMemo(
        () => hasRole(Role.Admin) || hasRole(Role.Manager) || (!isNil(user) && user.points > 1000),
        [hasRole, user],
    )

    const canReactivate = useMemo(
        () => problem.status === ProblemStatus.Done && session?.user,
        [problem.status, session],
    )

    const [currentContent, setCurrentContent] = useState<ProblemDetailViewContent>(
        ProblemDetailViewContent.Details,
    )

    const {
        data: comments,
        isLoading: commentsLoading,
        refetch: refetchComments,
    } = useProblemCommentsByProblemQuery({
        problemId: problem.id,
    })

    const { data: category, isLoading: categoryLoading } = useCategoryByIdQuery({
        categoryId: problem.categoryId,
    })

    const { icon, color } = useMemo(
        () => problemStatusToIconAndColor(problem.status),
        [problem.status],
    )

    const onPressComments = useCallback(() => {
        setCurrentContent(ProblemDetailViewContent.Comments)
    }, [])

    const onReview = useCallback(() => {
        setCurrentContent(ProblemDetailViewContent.Review)
    }, [])

    const onReactivation = useCallback(() => {
        setCurrentContent(ProblemDetailViewContent.Reactivation)
    }, [])

    useEffect(() => {
        const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
            onClose()
            return true
        })

        return () => subscription.remove()
    }, [onClose])

    return (
        <View style={[StyleSheet.absoluteFillObject, styles.wrapper]}>
            <Card style={[globalStyles.bgWhite, styles.card]}>
                {categoriesLoading ||
                userLoading ||
                categoryLoading ||
                commentsLoading ||
                isNil(category) ? (
                    <View style={globalStyles.flexRow}>
                        <LoadingSpinner size={70} />
                    </View>
                ) : (
                    <View style={styles.gapBetween}>
                        {currentContent === ProblemDetailViewContent.Details ? (
                            <>
                                <IconButton
                                    icon='close'
                                    onPress={onClose}
                                    style={styles.closeButton}
                                    size={RFValue(20)}
                                    mode='contained'
                                />

                                <View style={globalStyles.flexRow}>
                                    <Icon
                                        source={icon}
                                        color={color}
                                        size={RFValue(35)}
                                    />
                                    <View style={styles.headingWrapper}>
                                        <Text
                                            variant='headlineSmall'
                                            style={styles.title}
                                            numberOfLines={2}
                                            ellipsizeMode='tail'
                                        >
                                            {problem.title}
                                        </Text>
                                    </View>
                                </View>
                            </>
                        ) : (
                            <View style={globalStyles.flexRowWithSpace}>
                                <IconButton
                                    icon='arrow-left'
                                    mode='contained'
                                    onPress={() =>
                                        setCurrentContent(ProblemDetailViewContent.Details)
                                    }
                                />
                                <View style={globalStyles.flexRow}>
                                    <Icon
                                        source={icon}
                                        color={color}
                                        size={RFValue(30)}
                                    />
                                    <View style={styles.headingWrapper}>
                                        <Text
                                            style={styles.title}
                                            numberOfLines={2}
                                            ellipsizeMode='tail'
                                        >
                                            {problem.title}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}

                        {currentContent === ProblemDetailViewContent.Details && (
                            <>
                                {canReview && (
                                    <IconButton
                                        icon='pencil'
                                        onPress={onReview}
                                        style={styles.reviewButton}
                                        size={RFValue(20)}
                                        mode='contained'
                                    />
                                )}
                                {!canReview && canReactivate && (
                                    <IconButton
                                        icon='refresh'
                                        onPress={onReactivation}
                                        style={styles.reviewButton}
                                        size={RFValue(20)}
                                        mode='contained'
                                    />
                                )}
                                <IconButton
                                    icon='close'
                                    onPress={onClose}
                                    style={styles.closeButton}
                                    size={RFValue(20)}
                                    mode='contained'
                                />
                                <ProblemDetails
                                    problem={problem}
                                    category={category}
                                    comments={comments ?? []}
                                    onPressComments={onPressComments}
                                />
                            </>
                        )}
                        {currentContent === ProblemDetailViewContent.Comments && (
                            <ProblemComments
                                problem={problem}
                                onSend={refetchComments}
                                comments={comments ?? []}
                            />
                        )}
                        {currentContent === ProblemDetailViewContent.Review && (
                            <ProblemReview
                                problem={problem}
                                onClose={onClose}
                                categories={categories ?? []}
                            />
                        )}
                        {currentContent === ProblemDetailViewContent.Reactivation && (
                            <ProblemReactivation
                                problem={problem}
                                onClose={onClose}
                            />
                        )}
                    </View>
                )}
            </Card>
        </View>
    )
}

export default ProblemDetailView
