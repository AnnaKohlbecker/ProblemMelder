import { View } from 'react-native'
import { Card, IconButton, Text } from 'react-native-paper'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'

type Problem = {
    id: number
    title: string
    address?: string
    formattedDate: string
    imageUri?: string
    status: number
}

type ProblemCardProps = {
    problem: Problem
}

const ProblemCard = ({ problem }: ProblemCardProps) => {
    return (
        <Card
            key={problem.id}
            style={globalStyles.card}
        >
            <Card.Title
                title={problem.title}
                left={(props) => (
                    <IconButton
                        {...props}
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
                )}
            />
            {problem.imageUri && <Card.Cover source={{ uri: problem.imageUri }} />}
            <Card.Content>
                <View style={globalStyles.infoRow}>
                    <IconButton
                        icon='map-marker'
                        size={18}
                    />
                    <Text>{problem.address}</Text>
                </View>
                <View style={globalStyles.infoRow}>
                    <IconButton
                        icon='calendar'
                        size={18}
                    />
                    <Text>{problem.formattedDate}</Text>
                </View>
            </Card.Content>
            <Card.Actions>
                <IconButton
                    icon='comment'
                    size={18}
                />
            </Card.Actions>
        </Card>
    )
}

export default ProblemCard
