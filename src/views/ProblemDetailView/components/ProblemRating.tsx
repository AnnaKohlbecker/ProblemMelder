import { isNil } from 'lodash'
import { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { Button, IconButton, Text } from 'react-native-paper'
import { useUserProblemReviewQuery } from '~/queries/ProblemReviews/useUserProblemReviewQuery'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import RatingInput from '~/shared/views/RatingInput'
import { Problem, ProblemReview } from '~/supabase/types'
import { useReviewUpdateLogic } from '~/views/ProblemDetailView/hooks/useReviewUpdateLogic'

type Props = {
    problem: Problem
    onClose: () => void
}

const styles = StyleSheet.create({
    ratingIcons: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    limitedHeight: {
        height: 300,
    },
})

const ProblemRating = ({ problem, onClose }: Props) => {
    const { session } = useAuth()

    const {
        data: userReview,
        isLoading: userReviewLoading,
        refetch: refetchUserReview,
    } = useUserProblemReviewQuery({
        userId: session?.user.id,
        problemId: problem.id,
    })

    const { onImportanceRating, onStarRating } = useReviewUpdateLogic({
        problemId: problem.id,
        userId: session?.user.id,
        refetch: () => {
            refetchUserReview()
        },
        userReview,
    })

    const form = useForm<Partial<ProblemReview>>({
        values: {
            problemId: problem.id,
            userId: session?.user.id,
            ...userReview,
        },
    })
    const {
        handleSubmit,
        formState: { isDirty },
    } = form

    const onSubmit = useCallback(
        (data: Partial<ProblemReview>) => {
            if (problem.status === ProblemStatus.Done) onStarRating(data.stars ?? null)
            else onImportanceRating(data.importance ?? null)

            onClose()
        },
        [onClose, onImportanceRating, onStarRating, problem.status],
    )

    const onReset = useCallback(
        (data: Partial<ProblemReview>) => {
            if (problem.status === ProblemStatus.Done) {
                data = {
                    ...data,
                    stars: null,
                }
            } else {
                data = {
                    ...data,
                    importance: null,
                }
            }

            onSubmit(data)
        },
        [problem.status, onSubmit],
    )

    if (userReviewLoading) return <LoadingSpinner />

    return (
        <FormProvider {...form}>
            <View style={[globalStyles.contentWrapper, styles.limitedHeight]}>
                <View style={globalStyles.cardSubtitle}>
                    <View style={globalStyles.flexRow}>
                        <IconButton
                            size={20}
                            icon='arrow-left'
                            mode='outlined'
                            onPress={onClose}
                            iconColor={colors.primary}
                        />

                        <Text style={globalStyles.subtitle}>
                            {problem.status === ProblemStatus.Done
                                ? 'Lösung bewerten'
                                : 'Dringlichkeit bewerten'}
                        </Text>
                    </View>
                </View>
                <View style={styles.ratingIcons}>
                    <RatingInput
                        name={problem.status === ProblemStatus.Done ? 'stars' : 'importance'}
                        amount={problem.status === ProblemStatus.Done ? 5 : 3}
                        emptyIcon={
                            problem.status === ProblemStatus.Done
                                ? 'star-outline'
                                : 'alert-circle-outline'
                        }
                        filledIcon={problem.status === ProblemStatus.Done ? 'star' : 'alert-circle'}
                    />
                </View>
                <View style={globalStyles.flexRowWithSpace}>
                    <Button
                        mode='contained'
                        onPress={handleSubmit(onReset)}
                        disabled={
                            isNil(userReview?.id) || problem.status === ProblemStatus.Done
                                ? isNil(userReview?.stars)
                                : isNil(userReview.importance)
                        }
                    >
                        Löschen
                    </Button>
                    <Button
                        mode='contained'
                        onPress={handleSubmit(onSubmit)}
                        disabled={!isDirty}
                    >
                        Speichern
                    </Button>
                </View>
            </View>
        </FormProvider>
    )
}

export default ProblemRating
