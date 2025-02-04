import { useMemo } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Card, IconButton, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { getImagePath } from '~/shared/helpers/getImagePath'
import getRatingIcons from '~/shared/helpers/getRatingIcons'
import { problemStatusToIconAndColor } from '~/shared/helpers/ProblemStatusToIconAndColor'
import { DisplayedProblem } from '~/shared/types/DisplayedProblems'

const styles = StyleSheet.create({
    columnGap: {
        width: RFValue(40),
    },
    headerButton: {
        backgroundColor: colors.gray,
    },
    image: {
        alignSelf: 'center',
        borderRadius: 8,
        height: 100,
        width: 100,
    },
})

type Props = {
    problem: DisplayedProblem
}

const ProblemCard = ({ problem }: Props) => {
    const headerRightIcon = useMemo(() => {
        return problem.status === -1 ? 'replay' : 'delete'
    }, [problem.status])

    const iconAndColor = useMemo(
        () => problemStatusToIconAndColor(problem.status),
        [problem.status],
    )

    return (
        <Card style={globalStyles.card}>
            <View style={globalStyles.headerRow}>
                <View style={globalStyles.headerRowLeft}>
                    <IconButton
                        icon={iconAndColor.icon}
                        iconColor={iconAndColor.color}
                        size={RFValue(30)}
                    />
                    <Text style={globalStyles.title}>{problem.title}</Text>
                </View>
                <View style={globalStyles.headerRowRight}>
                    <IconButton
                        icon={headerRightIcon}
                        size={RFValue(20)}
                        iconColor={colors.black}
                        style={styles.headerButton}
                    />
                </View>
            </View>
            <View style={globalStyles.container}>
                <View style={globalStyles.column}>
                    <View style={globalStyles.infoRow}>
                        <IconButton
                            icon='map-marker'
                            size={RFValue(18)}
                            iconColor={colors.black}
                        />
                        <Text>{problem.address}</Text>
                    </View>
                    <View style={globalStyles.infoRow}>
                        <IconButton
                            icon='calendar'
                            size={RFValue(18)}
                            iconColor={colors.black}
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
            </View>
        </Card>
    )
}

export default ProblemCard
