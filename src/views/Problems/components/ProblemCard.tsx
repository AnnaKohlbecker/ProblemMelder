import { useMemo } from 'react'
import { View } from 'react-native'
import { Card, IconButton, Text, TouchableRipple } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { globalStyles } from '~/shared/constants/globalStyles'
import { problemStatusToIconAndColor } from '~/shared/helpers/ProblemStatusToIconAndColor'
import { Problem } from '~/supabase/types'

type Props = {
    problem: Problem
    onCardPress?: () => void
}

const ProblemCard = ({ problem, onCardPress }: Props) => {
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
                </View>
            </TouchableRipple>
        </Card>
    )
}

export default ProblemCard
