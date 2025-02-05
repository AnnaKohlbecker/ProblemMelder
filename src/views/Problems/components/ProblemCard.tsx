import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, IconButton, Text, TouchableRipple } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { problemStatusToIconAndColor } from '~/shared/helpers/ProblemStatusToIconAndColor'
import { Problem } from '~/shared/models/Problem'

const styles = StyleSheet.create({
    headerButton: {
        backgroundColor: colors.gray,
    },
})

type Props = {
    problem: Problem
    onCardPress?: () => void
}

const ProblemCard = ({ problem, onCardPress }: Props) => {
    const headerRightIcon = useMemo(() => {
        return problem.status === -1 ? 'replay' : 'delete'
    }, [problem.status])

    const iconAndColor = useMemo(
        () => problemStatusToIconAndColor(problem.status),
        [problem.status],
    )

    return (
        <Card style={globalStyles.card}>
            <TouchableRipple onPress={onCardPress}>
                <View style={globalStyles.flexRowWithSpace}>
                    <View style={globalStyles.flexRow}>
                        <IconButton
                            icon={iconAndColor.icon}
                            iconColor={iconAndColor.color}
                            size={RFValue(30)}
                        />
                        <Text style={globalStyles.title}>{problem.title}</Text>
                    </View>
                    <View style={globalStyles.flexRow}>
                        <IconButton
                            icon={headerRightIcon}
                            size={RFValue(20)}
                            iconColor={colors.black}
                            style={styles.headerButton}
                        />
                    </View>
                </View>
            </TouchableRipple>
        </Card>
    )
}

export default ProblemCard
