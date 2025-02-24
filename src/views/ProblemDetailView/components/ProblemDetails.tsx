import * as Location from 'expo-location'
import { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, Text, TouchableRipple } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { getImagePath } from '~/shared/helpers/getImagePath'
import getRatingIcons from '~/shared/helpers/getRatingIcons'
import { Category } from '~/shared/models/Category'
import { Problem } from '~/shared/models/Problem'
import { CommentWithUserData } from '~/shared/types/CommentWithUserData'
import ImagePreview from '~/shared/views/Image'

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
        height: RFValue(240),
        maxWidth: '100%',
        width: RFValue(1000),
    },
    imageWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
})

const ProblemDetails = ({ problem, category, comments, onPressComments }: Props) => {
    const [address, setAddress] = useState<string>()

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
                        size={RFValue(25)}
                    />
                </View>
                <Text variant='bodyLarge'>{category.title}</Text>
            </View>
            <View style={globalStyles.flexRow}>
                <View style={styles.icon}>
                    <Icon
                        source='map-marker'
                        size={RFValue(25)}
                        color={colors.black}
                    />
                </View>
                <Text
                    variant='bodyLarge'
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
                        size={RFValue(25)}
                        color={colors.black}
                    />
                </View>
                <Text variant='bodyLarge'>{formattedDate}</Text>
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
                                size={RFValue(25)}
                                color={colors.primary}
                            />
                        </View>
                        <Text variant='bodyLarge'>{comments.length}</Text>
                    </View>
                </TouchableRipple>
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
        </>
    )
}

export default ProblemDetails
