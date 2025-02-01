import { Image, StyleSheet, View } from 'react-native'
import { Card, IconButton, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'
import { DisplayedProblem } from '~/shared/models/DisplayedProblems'

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
    },
    column: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    gap: {
        width: RFValue(40),
    },
    headerRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    iconGroup: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    image: {
        alignSelf: 'center',
        borderRadius: 8,
        height: 120,
        width: 120,
    },
    infoRow: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 2,
    },
    ratingContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        fontSize: RFValue(16),
        fontWeight: 'bold',
    },
})

const getRating = (count: number) => {
    const fullStars = Math.round(count / 5) // Assuming a rating scale of 0-25 maps to 5 stars
    return Array(5)
        .fill(0)
        .map((_, i) => (
            <IconButton
                key={i}
                icon={i < fullStars ? 'star' : 'star-outline'}
                size={RFValue(20)}
                iconColor={colors.yellow}
            />
        ))
}

type Props = {
    problem: DisplayedProblem
}

const ProblemCard = ({ problem }: Props) => {
    return (
        <Card style={styles.card}>
            <View style={styles.headerRow}>
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
                />
                <Text style={styles.title}>{problem.title}</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.column}>
                    <View style={styles.infoRow}>
                        <IconButton
                            icon='map-marker'
                            size={RFValue(20)}
                            iconColor={colors.primary}
                        />
                        <Text>{problem.address}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <IconButton
                            icon='calendar'
                            size={RFValue(20)}
                            iconColor={colors.primary}
                        />
                        <Text>{problem.formattedDate}</Text>
                    </View>
                </View>
                <View style={styles.gap}></View>
                <View style={styles.column}>
                    {problem.imageUri && (
                        <Image
                            source={{ uri: problem.imageUri }}
                            style={styles.image}
                        />
                    )}
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.column}>
                    <View style={styles.iconGroup}>
                        <IconButton
                            icon='comment'
                            size={RFValue(20)}
                            iconColor={colors.primary}
                        />
                        <Text>{problem.commentsCount}</Text>
                    </View>
                </View>
                <View style={styles.column}>
                    <View style={styles.ratingContainer}>
                        {problem.status === 2 ? (
                            <View style={styles.iconGroup}>
                                {getRating(problem.stars ?? 0)}
                                <Text>{problem.starsVotesCount}</Text>
                            </View>
                        ) : (
                            <View style={styles.iconGroup}>
                                {getRating(problem.priority ?? 0)}
                                <Text>{problem.priorityVotesCount}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </Card>
    )
}

export default ProblemCard
