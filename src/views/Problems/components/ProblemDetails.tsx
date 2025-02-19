import * as Location from 'expo-location'
import { useEffect, useMemo, useState } from 'react'
import { BackHandler, StyleSheet, View } from 'react-native'
import { Card, Icon, IconButton, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { useProblemCategoryByIdQuery } from '~/queries/ProblemCategories/useProblemCategoryByIdQuery'
import { useProblemCommentsByProblemQuery } from '~/queries/ProblemComments/useCommentsByProblemQuery'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { getImagePath } from '~/shared/helpers/getImagePath'
import getRatingIcons from '~/shared/helpers/getRatingIcons'
import { problemStatusToIconAndColor } from '~/shared/helpers/ProblemStatusToIconAndColor'
import { Problem } from '~/shared/models/Problem'
import ImagePreview from '~/shared/views/Image'
import LoadingSpinner from '~/shared/views/LoadingSpinner'

type Props = {
    problem: Problem
    onClose: () => void
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        width: '90%',
    },
    closeButton: {
        position: 'absolute',
        right: -20,
        top: -20,
    },
    content: {
        paddingVertical: 10,
    },
    flexText: {
        flexShrink: 1,
        flexWrap: 'wrap',
    },
    icon: {
        padding: 10,
    },
    image: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: colors.secondary,
        borderRadius: 20,
        height: RFValue(240),
        justifyContent: 'center',
        width: RFValue(240),
    },
    title: {
        fontWeight: 'bold',
    },
    titleWrapper: {
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
    wrapper: {
        alignItems: 'center',
        backgroundColor: colors.backdrop,
        elevation: 1000,
        justifyContent: 'center',
    },
})

const ProblemDetails = ({ problem, onClose }: Props) => {
    const [address, setAddress] = useState<string>()

    const { data: comments, isLoading: commentsLoading } = useProblemCommentsByProblemQuery({
        problemId: problem.id,
    })

    const { data: problemCategory, isLoading: problemCategoryLoading } =
        useProblemCategoryByIdQuery({
            categoryId: problem.categoryId,
        })

    const { icon, color } = useMemo(
        () => problemStatusToIconAndColor(problem.status),
        [problem.status],
    )

    const formattedDate = useMemo(
        () => new Date(problem.date).toLocaleDateString('de-DE'),
        [problem.date],
    )

    useEffect(() => {
        const [latitude, longitude] = problem.location.split(',').map(Number)

        Location.reverseGeocodeAsync({ latitude, longitude }).then(([location]) => {
            setAddress(
                location.formattedAddress ??
                    `${location.street ?? ''}, ${location.city ?? ''}, ${location.country ?? ''}`,
            )
        })
    }, [problem.location])

    useEffect(() => {
        const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
            onClose()
            return true
        })

        return () => subscription.remove()
    }, [onClose])

    return (
        <View style={[StyleSheet.absoluteFillObject, styles.wrapper]}>
            {problemCategoryLoading ? (
                <LoadingSpinner size={70} />
            ) : (
                <Card style={[globalStyles.bgWhite, styles.card]}>
                    <Icon
                        source={icon}
                        color={color}
                        size={RFValue(45)}
                    />
                    <View style={styles.titleWrapper}>
                        <Icon
                            source={problemCategory?.icon}
                            color={colors.black}
                            size={RFValue(25)}
                        />
                        <Text
                            variant='headlineSmall'
                            style={styles.title}
                        >
                            {problem.title}
                        </Text>
                    </View>
                    <IconButton
                        icon='close'
                        onPress={onClose}
                        style={styles.closeButton}
                    />
                    <View style={styles.content}>
                        {problem.image ? (
                            <ImagePreview
                                source={{ uri: getImagePath(problem.image) }}
                                style={styles.image}
                            />
                        ) : (
                            <View style={styles.image}>
                                <Text style={globalStyles.noDataText}>Kein Bild vorhanden</Text>
                            </View>
                        )}
                    </View>
                    <View style={globalStyles.flexRow}>
                        <View style={styles.icon}>
                            <Icon
                                source='map-marker'
                                size={RFValue(25)}
                                color={colors.black}
                            />
                        </View>
                        {address ? (
                            <Text
                                variant='bodyLarge'
                                numberOfLines={2}
                                lineBreakMode='tail'
                                style={styles.flexText}
                            >
                                {address}
                            </Text>
                        ) : (
                            <LoadingSpinner size={20} />
                        )}
                    </View>
                    <View style={globalStyles.flexRow}>
                        <View style={styles.icon}>
                            <Icon
                                source='calendar'
                                size={RFValue(25)}
                                color={colors.black}
                            />
                        </View>
                        <Text variant='bodyLarge'>{formattedDate}</Text>
                    </View>
                    <View style={globalStyles.flexRowWithSpace}>
                        <View style={globalStyles.flexRow}>
                            <View style={styles.icon}>
                                <Icon
                                    source='comment'
                                    size={RFValue(25)}
                                    color={colors.primary}
                                />
                            </View>

                            {commentsLoading ? (
                                <View>
                                    <LoadingSpinner size={20} />
                                </View>
                            ) : (
                                <Text variant='bodyLarge'>{comments?.length}</Text>
                            )}
                        </View>
                        <View style={globalStyles.flexRow}>
                            {problem.status === 2 ? (
                                <>
                                    {getRatingIcons(problem.status, problem.stars ?? 0)}
                                    <Text>{problem.starsVotesCount}</Text>
                                </>
                            ) : (
                                <>
                                    {getRatingIcons(problem.status, problem.priority ?? 0)}
                                    <Text>{problem.priorityVotesCount}</Text>
                                </>
                            )}
                        </View>
                    </View>
                </Card>
            )}
        </View>
    )
}

export default ProblemDetails
