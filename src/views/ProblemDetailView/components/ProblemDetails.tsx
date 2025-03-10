import * as Location from 'expo-location'
import { isNil } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Icon, Text, TouchableRipple } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { useProblemReviewsQuery } from '~/queries/ProblemReviews/useProblemReviewsQuery'
import { useUserProblemReviewQuery } from '~/queries/ProblemReviews/useUserProblemReviewQuery'
import { useUserByIdQuery } from '~/queries/UserData/useUserByIdQuery'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { getImagePath } from '~/shared/helpers/getImagePath'
import getRatingIcons from '~/shared/helpers/getRatingIcons'
import { useReviewLogic } from '~/shared/hooks/useReviewLogic'
import ImagePreview from '~/shared/views/Image'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import { Category, CommentWithUserData, Problem } from '~/supabase/types'
import { ProblemDetailViewContent } from '~/views/ProblemDetailView/enums/ProblemDetailViewContent'
import { useReviewUpdateLogic } from '~/views/ProblemDetailView/hooks/useReviewUpdateLogic'

type Props = {
    problem: Problem
    category: Category
    comments: CommentWithUserData[]
    goTo: (content: ProblemDetailViewContent) => () => void
}

const styles = StyleSheet.create({
    flexText: {
        flexShrink: 1,
        flexWrap: 'wrap',
    },
    icon: {
        alignSelf: 'flex-start',
    },
    image: {
        borderRadius: 10,
        height: RFValue(140),
        maxWidth: '100%',
        width: RFValue(90),
    },
    loading: {
        height: 100,
    },
    description: {
        height: 160,
    },
    text: {
        fontSize: RFValue(14),
    },
    ripple: {
        paddingHorizontal: 20,
        borderRadius: 30,
        height: RFValue(40),
        justifyContent: 'center',
    },
    buttonContent: {
        height: RFValue(40),
        borderRadius: 30,
    },
    activeButtonContent: {
        height: RFValue(40),
        borderRadius: 30,
        backgroundColor: colors.secondary,
    },
    disabledButtonContent: {
        height: RFValue(40),
        borderRadius: 30,
        backgroundColor: colors.tertiary,
    },
    disabledText: {
        fontSize: RFValue(14),
        color: colors.secondary,
    },
})

const ProblemDetails = ({ problem, category, comments, goTo }: Props) => {
    const { session } = useAuth()

    const [address, setAddress] = useState<string>()

    const { data: author, isLoading: authorLoading } = useUserByIdQuery({
        userId: problem.userId,
    })

    const formattedDate = useMemo(
        () => new Date(problem.date).toLocaleDateString('de-DE'),
        [problem.date],
    )

    const isDisabled = useMemo(
        () =>
            isNil(session) ||
            problem.status === ProblemStatus.Done ||
            problem.status === ProblemStatus.Cancelled,
        [problem.status, session],
    )

    const {
        data: reviews,
        isLoading: reviewsLoading,
        refetch: refetchReviews,
    } = useProblemReviewsQuery({
        problemId: problem.id,
    })
    const { amountOfImportance, amountOfStars, helpful, importance, stars, unhelpful } =
        useReviewLogic({ reviews })

    const {
        data: userReview,
        isLoading: userReviewLoading,
        refetch: refetchUserReview,
    } = useUserProblemReviewQuery({
        userId: session?.user.id,
        problemId: problem.id,
    })
    const { onHelpful } = useReviewUpdateLogic({
        userId: session?.user.id,
        problemId: problem.id,
        userReview,
        refetch: () => {
            refetchReviews()
            refetchUserReview()
        },
    })

    useEffect(() => {
        const [latitude, longitude] = problem.location.split(',').map(Number)

        Location.reverseGeocodeAsync({ latitude, longitude }).then(([location]) => {
            setAddress(
                location.formattedAddress ??
                    `${location.street ?? ''}, ${location.city ?? ''}, ${location.country ?? ''}`,
            )
        })
    }, [problem.location])

    if (reviewsLoading || userReviewLoading || authorLoading || isNil(problem.image))
        return (
            <View style={styles.loading}>
                <LoadingSpinner size={50} />
            </View>
        )

    return (
        <View style={globalStyles.contentWrapper}>
            <View style={globalStyles.gap}>
                <View style={[globalStyles.flexRow, globalStyles.gap]}>
                    <ImagePreview
                        source={{ uri: getImagePath(problem.image) }}
                        style={styles.image}
                    />
                    <View style={globalStyles.gap}>
                        <View style={globalStyles.flexRowWithGap}>
                            <View style={styles.icon}>
                                <Icon
                                    source={category.icon}
                                    color={colors.primary}
                                    size={RFValue(23)}
                                />
                            </View>
                            <Text style={styles.text}>{category.title}</Text>
                        </View>
                        <View style={globalStyles.flexRowWithGap}>
                            <View style={styles.icon}>
                                <Icon
                                    source='calendar'
                                    size={RFValue(23)}
                                    color={colors.primary}
                                />
                            </View>
                            <Text style={styles.text}>{formattedDate}</Text>
                        </View>
                        <View style={globalStyles.flexRowWithGap}>
                            <View style={styles.icon}>
                                <Icon
                                    source='account-edit'
                                    size={RFValue(23)}
                                    color={colors.primary}
                                />
                            </View>
                            <Text style={styles.text}>{author?.name}</Text>
                        </View>
                    </View>
                </View>

                <View style={globalStyles.flexRowWithGap}>
                    <View style={styles.icon}>
                        <Icon
                            source='map-marker'
                            size={RFValue(23)}
                            color={colors.primary}
                        />
                    </View>
                    <Text
                        numberOfLines={2}
                        lineBreakMode='tail'
                        style={[styles.flexText, styles.text]}
                    >
                        {address}
                    </Text>
                </View>

                <View style={globalStyles.flexRowWithGap}>
                    <View style={styles.icon}>
                        <Icon
                            source='text-long'
                            size={RFValue(23)}
                            color={colors.primary}
                        />
                    </View>
                    <ScrollView style={styles.description}>
                        <Text style={[styles.flexText, styles.text]}>{problem.description}</Text>
                    </ScrollView>
                </View>
            </View>

            <View style={globalStyles.flexRowWithSpace}>
                <Button
                    mode='contained'
                    buttonColor={colors.transparent}
                    onPress={goTo(ProblemDetailViewContent.Comments)}
                    disabled={isNil(session)}
                    textColor={colors.primary}
                    contentStyle={styles.buttonContent}
                    icon={() => (
                        <Icon
                            source='comment'
                            size={RFValue(18)}
                        />
                    )}
                >
                    <Text style={styles.text}>{comments.length}</Text>
                </Button>
                <TouchableRipple
                    borderless={true}
                    style={styles.ripple}
                    disabled={isNil(session)}
                    onPress={goTo(ProblemDetailViewContent.Rating)}
                >
                    <View style={globalStyles.flexRow}>
                        {problem.status === ProblemStatus.Done ? (
                            <>
                                {getRatingIcons(problem.status, stars)}
                                <Text style={styles.text}>{amountOfStars}</Text>
                            </>
                        ) : (
                            <>
                                {getRatingIcons(problem.status, importance)}
                                <Text style={styles.text}>{amountOfImportance}</Text>
                            </>
                        )}
                    </View>
                </TouchableRipple>
            </View>

            <View style={globalStyles.flexRowWithSpace}>
                <Button
                    mode='contained'
                    buttonColor={colors.transparent}
                    onPress={() => {
                        onHelpful(userReview?.helpful ? null : true)
                    }}
                    disabled={isDisabled}
                    icon={() => (
                        <Icon
                            source='thumb-up'
                            size={RFValue(18)}
                            color={isDisabled ? colors.secondary : colors.primary}
                        />
                    )}
                    contentStyle={
                        isDisabled
                            ? styles.disabledButtonContent
                            : userReview?.helpful === true && !isNil(userReview)
                              ? styles.activeButtonContent
                              : styles.buttonContent
                    }
                >
                    <Text style={isDisabled ? styles.disabledText : styles.text}>
                        Hilfreich {helpful}
                    </Text>
                </Button>
                <Button
                    mode='contained'
                    buttonColor={colors.transparent}
                    onPress={() => {
                        onHelpful(userReview?.helpful === false ? null : false)
                    }}
                    disabled={isDisabled}
                    icon={() => (
                        <Icon
                            source='thumb-down'
                            size={RFValue(18)}
                            color={isDisabled ? colors.secondary : colors.primary}
                        />
                    )}
                    contentStyle={
                        isDisabled
                            ? styles.disabledButtonContent
                            : userReview?.helpful === false && !isNil(userReview)
                              ? styles.activeButtonContent
                              : styles.buttonContent
                    }
                >
                    <Text style={isDisabled ? styles.disabledText : styles.text}>
                        Irrtum {unhelpful}
                    </Text>
                </Button>
            </View>
        </View>
    )
}

export default ProblemDetails
