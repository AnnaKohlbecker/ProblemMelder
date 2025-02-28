import { isNil } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { BackHandler, StyleSheet, View } from 'react-native'
import { Card, Icon, IconButton, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { useCategoryByIdQuery } from '~/queries/Categories/useCategoryByIdQuery'
import { useProblemCommentsByProblemQuery } from '~/queries/ProblemComments/useProblemCommentsByProblemQuery'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { problemStatusToIconAndColor } from '~/shared/helpers/ProblemStatusToIconAndColor'
import { Problem } from '~/shared/models/Problem'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import ProblemComments from '~/views/ProblemDetailView/components/ProblemComments'
import ProblemDetails from '~/views/ProblemDetailView/components/ProblemDetails'
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
        paddingLeft: 10,
    },
    title: {
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
                {categoryLoading || commentsLoading || isNil(category) ? (
                    <View style={globalStyles.flexRow}>
                        <LoadingSpinner size={70} />
                    </View>
                ) : (
                    <View style={styles.gapBetween}>
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
                        {currentContent === ProblemDetailViewContent.Details && (
                            <ProblemDetails
                                problem={problem}
                                category={category}
                                comments={comments ?? []}
                                onPressComments={onPressComments}
                            />
                        )}
                        {currentContent === ProblemDetailViewContent.Comments && (
                            <ProblemComments
                                problem={problem}
                                onSend={refetchComments}
                                comments={comments ?? []}
                            />
                        )}
                    </View>
                )}
            </Card>
        </View>
    )
}

export default ProblemDetailView
