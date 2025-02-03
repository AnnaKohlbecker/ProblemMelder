import { Image, StyleSheet, View } from 'react-native'
import { Card, IconButton, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { getImagePath } from '~/shared/helpers/getImagePath'
import { DisplayedProblem } from '~/shared/models/DisplayedProblems'

const styles = StyleSheet.create({
    columnGap: {
        width: RFValue(40),
    },
    image: {
        alignSelf: 'center',
        borderRadius: 8,
        height: 120,
        width: 120,
    },
    ratingIcon: {
        marginHorizontal: 0,
        padding: 0,
    },
})

const getRating = (status: number, rating: number) => {
    const maxRating = status === 2 ? 5 : 3
    const filledCount = Math.floor(rating)

    return Array.from({ length: maxRating }, (_, i) => {
        const isFilled = i < filledCount
        const iconName =
            status === 2
                ? isFilled
                    ? 'star'
                    : 'star-outline'
                : isFilled
                  ? 'alert-circle'
                  : 'alert-circle-outline'

        return (
            <IconButton
                key={i}
                icon={iconName}
                size={RFValue(18)}
                iconColor={status === 2 ? colors.yellow : colors.red}
                style={styles.ratingIcon}
            />
        )
    })
}

type Props = {
    problem: DisplayedProblem
}

const ProblemCard = ({ problem }: Props) => {
    return (
        <Card style={globalStyles.card}>
            <View style={globalStyles.headerRow}>
                <IconButton
                    icon={
                        problem.status === 0
                            ? 'alert-circle'
                            : problem.status === 1
                              ? 'progress-wrench'
                              : 'check-circle'
                    }
                    iconColor={
                        problem.status === 0
                            ? colors.red
                            : problem.status === 1
                              ? colors.orange
                              : colors.green
                    }
                    size={RFValue(30)}
                />
                <Text style={globalStyles.title}>{problem.title}</Text>
            </View>
            <View style={globalStyles.container}>
                <View style={globalStyles.column}>
                    <View style={globalStyles.infoRow}>
                        <IconButton
                            icon='map-marker'
                            size={RFValue(18)}
                            iconColor={colors.primary}
                        />
                        <Text>{problem.address}</Text>
                    </View>
                    <View style={globalStyles.infoRow}>
                        <IconButton
                            icon='calendar'
                            size={RFValue(18)}
                            iconColor={colors.primary}
                        />
                        <Text>{problem.formattedDate}</Text>
                    </View>
                </View>
                <View style={styles.columnGap}></View>
                <View style={globalStyles.column}>
                    {problem.image && (
                        <Image
                            source={{
                                uri: getImagePath(problem.image),
                            }}
                            style={styles.image}
                        />
                    )}
                </View>
            </View>
            <View style={globalStyles.container}>
                <View style={globalStyles.column}>
                    <View style={globalStyles.iconGroup}>
                        <IconButton
                            icon='comment'
                            size={RFValue(18)}
                            iconColor={colors.primary}
                        />
                        <Text>{problem.commentsCount}</Text>
                    </View>
                </View>
                <View>
                    <View style={globalStyles.iconGroup}>
                        {problem.status === 2 ? (
                            <>
                                {getRating(problem.status, problem.stars ?? 0)}
                                <Text>{problem.starsVotesCount}</Text>
                            </>
                        ) : (
                            <>
                                {getRating(problem.status, problem.priority ?? 0)}
                                <Text>{problem.priorityVotesCount}</Text>
                            </>
                        )}
                    </View>
                </View>
            </View>
        </Card>
    )
}

export default ProblemCard
