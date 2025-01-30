import { Image, StyleSheet, View } from 'react-native'
import { Card, IconButton, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'
import { DisplayedProblem } from '~/shared/models/DisplayedProblems'

const styles = StyleSheet.create({
    actionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    card: {
        borderRadius: 10,
        margin: 10,
        padding: 10,
    },
    container: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    detailsContainer: {
        flex: 1,
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
        borderRadius: 8,
        height: 120,
        marginRight: 10,
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
                size={16}
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
                <View style={styles.detailsContainer}>
                    <View style={styles.infoRow}>
                        <IconButton
                            icon='map-marker'
                            size={18}
                        />
                        <Text>{problem.address}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <IconButton
                            icon='calendar'
                            size={18}
                        />
                        <Text>{problem.formattedDate}</Text>
                    </View>
                </View>
                {problem.imageUri && (
                    <Image
                        source={{ uri: problem.imageUri }}
                        style={styles.image}
                    />
                )}
            </View>
            <View style={styles.actionsRow}>
                <View style={styles.iconGroup}>
                    <IconButton
                        icon='comment'
                        size={18}
                    />
                    <Text>{problem.commentsCount}</Text>
                </View>
                <View style={styles.ratingContainer}>
                    {problem.status === 2 ? (
                        <>
                            {getRating(problem.stars ?? 0)}
                            <Text>{problem.starsVotesCount}</Text>
                        </>
                    ) : (
                        <>
                            {getRating(problem.priority ?? 0)}
                            <Text>{problem.priorityVotesCount}</Text>
                        </>
                    )}
                </View>
            </View>
        </Card>
    )
}

export default ProblemCard
