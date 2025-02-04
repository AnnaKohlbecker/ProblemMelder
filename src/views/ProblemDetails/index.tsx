import { useMemo } from 'react'
import { BackHandler, Image, StyleSheet, View } from 'react-native'
import { Appbar, Card, IconButton, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { getImagePath } from '~/shared/helpers/getImagePath'
import getRatingIcons from '~/shared/helpers/getRatingIcons'
import { problemStatusToIconAndColor } from '~/shared/helpers/ProblemStatusToIconAndColor'
import { DisplayedProblem } from '~/shared/types/DisplayedProblems'

type Props = {
    problem: DisplayedProblem
    onClose: () => void
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 10,
        marginVertical: 10,
        padding: 20,
    },
    flexText: {
        flexShrink: 1,
        flexWrap: 'wrap',
    },
    image: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: colors.gray,
        borderRadius: 20,
        height: RFValue(280),
        justifyContent: 'center',
        width: RFValue(260),
    },
    title: {
        fontSize: RFValue(20),
        fontWeight: 'bold',
        marginLeft: 10,
    },
})

const ProblemDetails = ({ problem, onClose }: Props) => {
    const iconAndColor = useMemo(
        () => problemStatusToIconAndColor(problem.status),
        [problem.status],
    )

    BackHandler.addEventListener('hardwareBackPress', () => {
        onClose()
        return true
    })

    return (
        <View>
            <Appbar.Header style={globalStyles.appbar}>
                <Appbar.BackAction onPress={onClose} />
            </Appbar.Header>
            <View style={globalStyles.cardsView}>
                <Card style={styles.card}>
                    <View style={globalStyles.flexRow}>
                        <IconButton
                            icon={iconAndColor.icon}
                            iconColor={iconAndColor.color}
                            size={RFValue(35)}
                        />
                        <Text style={styles.title}>{problem.title}</Text>
                    </View>
                    {problem.image ? (
                        <Image
                            source={{ uri: getImagePath(problem.image) }}
                            style={styles.image}
                        />
                    ) : (
                        <View style={styles.image}>
                            <Text style={globalStyles.noDataText}>Kein Bild vorhanden</Text>
                        </View>
                    )}
                    <View style={globalStyles.flexRow}>
                        <IconButton
                            icon='map-marker'
                            size={RFValue(25)}
                            iconColor={colors.black}
                        />
                        <Text style={styles.flexText}>{problem.address}</Text>
                    </View>
                    <View style={globalStyles.flexRow}>
                        <IconButton
                            icon='calendar'
                            size={RFValue(25)}
                            iconColor={colors.black}
                        />
                        <Text>{problem.formattedDate}</Text>
                    </View>
                    <View style={globalStyles.flexRowWithSpace}>
                        <View style={globalStyles.flexRow}>
                            <IconButton
                                icon='comment'
                                size={RFValue(25)}
                                iconColor={colors.primary}
                            />
                            <Text>{problem.commentsCount}</Text>
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
            </View>
        </View>
    )
}

export default ProblemDetails
