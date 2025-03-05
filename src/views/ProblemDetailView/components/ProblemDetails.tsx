import * as Location from 'expo-location'
import { isNil } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Divider, Icon, Text, TouchableRipple } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { useProblemReviewsQuery } from '~/queries/ProblemReviews/useProblemReviewsQuery'
import { useUserProblemReviewQuery } from '~/queries/ProblemReviews/useUserProblemReviewQuery'
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
import { useReviewUpdateLogic } from '~/views/ProblemDetailView/hooks/useReviewUpdateLogic'

type Props = {
    problem: Problem
    category: Category
    comments: CommentWithUserData[]
    onPressComments: () => void
}

const styles = StyleSheet.create({
    commentButton: {
        borderRadius: 6,
        padding: 10,
    },
    flexText: {
        flexShrink: 1,
        flexWrap: 'wrap',
    },
    icon: {
        paddingRight: 10,
    },
    image: {
        borderRadius: 20,
        height: RFValue(200),
        maxWidth: '100%',
        width: RFValue(200),
    },
    imageWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    rating: {
        marginRight: 10,
    },
    loading: {
        height: 100,
    },
})

const ProblemDetails = ({ problem, category, comments, onPressComments }: Props) => {
    const { session } = useAuth()

    const [address, setAddress] = useState<string>()

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

    if (reviewsLoading || userReviewLoading)
        return (
            <View style={styles.loading}>
                <LoadingSpinner size={50} />
            </View>
        )

    return (
        <>
            <View style={globalStyles.flexRow}>
                <View style={styles.imageWrapper}>
                    {problem.image ? (
                        <ImagePreview
                            source={{ uri: getImagePath(problem.image) }}
                            style={styles.image}
                        />
                    ) : (
                        <Text style={globalStyles.noDataText}>Kein Bild vorhanden</Text>
                    )}
                </View>
            </View>
            <View style={globalStyles.flexRow}>
                <View style={styles.icon}>
                    <Icon
                        source={category.icon}
                        color={colors.black}
                        size={RFValue(20)}
                    />
                </View>
                <Text>{category.title}</Text>
            </View>
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
                    style={styles.flexText}
                >
                    {address}
                </Text>
            </View>
            <View style={globalStyles.flexRow}>
                <View style={styles.icon}>
                    <Icon
                        source='calendar'
                        size={RFValue(20)}
                        color={colors.black}
                    />
                </View>
                <Text>{formattedDate}</Text>
            </View>
            <View style={globalStyles.flexRowWithSpace}>
                <TouchableRipple
                    borderless={true}
                    onPress={onPressComments}
                    style={styles.commentButton}
                >
                    <View style={globalStyles.flexRow}>
                        <View style={styles.icon}>
                            <Icon
                                source='comment'
                                size={RFValue(20)}
                                color={colors.primary}
                            />
                        </View>
                        <Text>{comments.length}</Text>
                    </View>
                </TouchableRipple>
                <View style={[globalStyles.flexRow, styles.rating]}>
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
            </View>

            <Divider />
            <View style={globalStyles.flexRow}>
                <Button
                    icon='thumb-up'
                    mode='text'
                    labelStyle={userReview?.helpful === true ? globalStyles.bold : undefined}
                    textColor={userReview?.helpful === true ? colors.primary : colors.black}
                    onPress={() => {
                        onHelpful(userReview?.helpful ? null : true)
                    }}
                    disabled={isNil(session)}
                >
                    Hilfreich ({helpful})
                </Button>
                <Text>|</Text>
                <Button
                    icon='thumb-down'
                    mode='text'
                    labelStyle={userReview?.helpful === false ? globalStyles.bold : undefined}
                    textColor={userReview?.helpful === false ? colors.primary : colors.black}
                    onPress={() => {
                        onHelpful(userReview?.helpful === false ? null : false)
                    }}
                    disabled={isNil(session)}
                >
                    Falschmeldung ({unhelpful})
                </Button>
            </View>
        </>
    )
}

export default ProblemDetails
