import { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { Button, IconButton, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { useUserProblemReviewQuery } from '~/queries/ProblemReviews/useUserProblemReviewQuery'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import StarsInput from '~/shared/views/StarsInput'
import { Problem, ProblemReview } from '~/supabase/types'
import { useReviewUpdateLogic } from '~/views/ProblemDetailView/hooks/useReviewUpdateLogic'

type Props = {
    problem: Problem
    onClose: () => void
}

const styles = StyleSheet.create({
    header: {
        gap: 10,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: RFValue(14),
        fontWeight: 'bold',
    },
    wrapper: {
        gap: 10,
    },
    footer: {
        alignItems: 'flex-end',
        marginTop: 20,
    },
    loading: {
        height: 100,
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

    if (userReviewLoading)
        return (
            <View style={styles.loading}>
                <LoadingSpinner size={50} />
            </View>
        )

    return (
        <FormProvider {...form}>
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <View style={globalStyles.flexRow}>
                        <IconButton
                            size={12}
                            icon='arrow-left'
                            mode='outlined'
                            onPress={onClose}
                        />

                        <Text style={styles.subtitle}>
                            {problem.status === ProblemStatus.Done
                                ? 'Problemlösung bewerten'
                                : 'Dringlichkeit bewerten'}
                        </Text>
                    </View>
                </View>
                <StarsInput
                    name={problem.status === ProblemStatus.Done ? 'stars' : 'importance'}
                    amount={problem.status === ProblemStatus.Done ? 5 : 3}
                    emptyIcon={
                        problem.status === ProblemStatus.Done
                            ? 'star-outline'
                            : 'alert-circle-outline'
                    }
                    filledIcon={problem.status === ProblemStatus.Done ? 'star' : 'alert-circle'}
                />
                <View style={styles.footer}>
                    <Button
                        mode='contained'
                        disabled={!isDirty}
                        onPress={handleSubmit(onSubmit)}
                    >
                        Speichern
                    </Button>
                </View>
            </View>
        </FormProvider>
    )
}

export default ProblemRating
