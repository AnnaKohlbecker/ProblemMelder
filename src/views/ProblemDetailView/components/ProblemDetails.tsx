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
        height: RFValue(120),
        maxWidth: '100%',
        width: RFValue(90),
    },
    imageWrapper: {
        gap: 10,
        marginBottom: 10,
    },
    loading: {
        height: 100,
    },
    details: {
        gap: 20,
    },
    description: {
        height: 160,
    },
    wrapper: {
        padding: 5,
        rowGap: 10,
    },
    ripple: {
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderRadius: 10,
    },
    detailsText: {
        fontSize: RFValue(14),
    },
    problemContent: {
        backgroundColor: colors.tertiary,
        borderRadius: 10,
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

    if (reviewsLoading || userReviewLoading || authorLoading)
        return (
            <View style={styles.loading}>
                <LoadingSpinner size={50} />
            </View>
        )

    return (
        <View style={styles.wrapper}>
            <View style={styles.problemContent}>
                <View style={[globalStyles.flexRow, styles.imageWrapper]}>
                    {problem.image ? (
                        <ImagePreview
                            source={{ uri: getImagePath(problem.image) }}
                            style={styles.image}
                        />
                    ) : (
                        <Text style={globalStyles.noDataText}>Kein Bild vorhanden</Text>
                    )}

                    <View style={styles.details}>
                        <View style={globalStyles.flexRowWithGap}>
                            <View style={styles.icon}>
                                <Icon
                                    source={category.icon}
                                    color={colors.black}
                                    size={RFValue(20)}
                                />
                            </View>
                            <Text style={styles.detailsText}>{category.title}</Text>
                        </View>
                        <View style={globalStyles.flexRowWithGap}>
                            <View style={styles.icon}>
                                <Icon
                                    source='calendar'
                                    size={RFValue(20)}
                                    color={colors.black}
                                />
                            </View>
                            <Text style={styles.detailsText}>{formattedDate}</Text>
                        </View>
                        <View style={globalStyles.flexRowWithGap}>
                            <View style={styles.icon}>
                                <Icon
                                    source='account-edit'
                                    size={RFValue(20)}
                                    color={colors.black}
                                />
                            </View>
                            <Text style={styles.detailsText}>{author?.name}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.details}>
                    <View style={globalStyles.flexRow}>
                        <View style={styles.icon}>
                            <Icon
                                source='map-marker'
                                size={RFValue(20)}
                                color={colors.black}
                            />
                        </View>
                        <Text
                            numberOfLines={2}
                            lineBreakMode='tail'
                            style={[styles.flexText, styles.detailsText]}
                        >
                            {address}
                        </Text>
                    </View>
                </View>

                <View style={globalStyles.flexRow}>
                    <View style={styles.icon}>
                        <Icon
                            source='text-long'
                            size={RFValue(20)}
                            color={colors.black}
                        />
                    </View>
                    <ScrollView style={styles.description}>
                        <Text style={[styles.flexText, styles.detailsText]}>
                            {problem.description}
                        </Text>
                    </ScrollView>
                </View>
            </View>

            <View style={globalStyles.flexRowWithSpace}>
                <TouchableRipple
                    borderless={true}
                    style={styles.ripple}
                    disabled={isNil(session)}
                    onPress={goTo(ProblemDetailViewContent.Comments)}
                >
                    <View style={globalStyles.flexRowWithGap}>
                        <Icon
                            source='comment'
                            size={RFValue(20)}
                            color={colors.primary}
                        />
                        <Text>{comments.length}</Text>
                    </View>
                </TouchableRipple>

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
                                <Text>{amountOfStars}</Text>
                            </>
                        ) : (
                            <>
                                {getRatingIcons(problem.status, importance)}
                                <Text>{amountOfImportance}</Text>
                            </>
                        )}
                    </View>
                </TouchableRipple>
            </View>

            <View style={globalStyles.flexRowWithGap}>
                <Button
                    icon='thumb-up'
                    mode='contained'
                    textColor={userReview?.helpful === true ? colors.primary : colors.secondary}
                    buttonColor={colors.white}
                    onPress={() => {
                        onHelpful(userReview?.helpful ? null : true)
                    }}
                    disabled={
                        isNil(session) ||
                        problem.status === ProblemStatus.Done ||
                        problem.status === ProblemStatus.Cancelled
                    }
                >
                    Hilfreich <Text>{helpful}</Text>
                </Button>
                <Button
                    icon='thumb-down'
                    mode='text'
                    textColor={userReview?.helpful === true ? colors.secondary : colors.primary}
                    buttonColor={colors.white}
                    onPress={() => {
                        onHelpful(userReview?.helpful === false ? null : false)
                    }}
                    disabled={
                        isNil(session) ||
                        problem.status === ProblemStatus.Done ||
                        problem.status === ProblemStatus.Cancelled
                    }
                >
                    Falschmeldung <Text>{unhelpful}</Text>
                </Button>
            </View>
        </View>
    )
}

export default ProblemDetails
