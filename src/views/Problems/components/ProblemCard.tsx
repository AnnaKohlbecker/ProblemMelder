import { useMemo } from 'react'
import { View } from 'react-native'
import { Card, IconButton, Text, TouchableRipple } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { globalStyles } from '~/shared/constants/globalStyles'
import { problemStatusToIconAndColor } from '~/shared/helpers/ProblemStatusToIconAndColor'
import { Problem } from '~/shared/models/Problem'

type Props = {
    problem: Problem
    onCardPress?: () => void
}

const ProblemCard = ({ problem, onCardPress }: Props) => {
    const headerRightIcon = useMemo(() => {
        return problem.status === -1 ? 'replay' : 'trash-can'
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
                    <IconButton
                        icon={headerRightIcon}
                        size={RFValue(20)}
                        mode='contained'
                    />
                </View>
            </TouchableRipple>
        </Card>
    )
}

export default ProblemCard
