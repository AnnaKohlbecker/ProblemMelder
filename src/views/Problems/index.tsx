import { useEffect } from 'react'
import { Alert, FlatList, View } from 'react-native'
import { Card, FAB, IconButton, Text } from 'react-native-paper'
import { BaseRoute } from 'react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation'
import { useProblemsQuery } from '~/queries/Problems/useProblemsQuery'
import { useUserByIdQuery } from '~/queries/Users/useUserByIdQuery'
import Header from '~/shared/components/Header'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'
import LoadingSpinner from '~/shared/views/LoadingSpinner'

type Props = {
    route: BaseRoute
}

const Problems = ({ route }: Props) => {
    const { session } = useAuth()
    const { isLoading: userLoading, error: userError } = useUserByIdQuery({
        userId: session?.user.id,
    })

    const { data: problems, isLoading: problemsLoading, error: problemsError } = useProblemsQuery()

    const onFabPress = () => {
        //
    }

    useEffect(() => {
        if (!userError && !problemsError) return

        Alert.alert('Error')
    }, [userError, problemsError])

    if (userLoading || problemsLoading) return <LoadingSpinner />

    return (
        <View style={globalStyles.flexBox}>
            <Header route={route} />
            <FlatList
                data={problems}
                style={globalStyles.flatList}
                renderItem={({ item: problem }) => (
                    <Card
                        key={problem.id}
                        style={globalStyles.card}
                    >
                        <Card.Title
                            title={problem.title}
                            left={(props) => (
                                <IconButton
                                    {...props}
                                    icon={problem.status ? 'check-circle' : 'clock'}
                                    iconColor={problem.status ? colors.green : colors.orange}
                                />
                            )}
                        />
                        <Card.Cover
                            source={{ uri: problem.image }}
                            style={globalStyles.image}
                        />
                        <Card.Content>
                            <View style={globalStyles.infoRow}>
                                <IconButton
                                    icon='map-marker'
                                    size={18}
                                />
                                <Text>{problem.location}</Text>
                            </View>
                            <View style={globalStyles.infoRow}>
                                <IconButton
                                    icon='calendar'
                                    size={18}
                                />
                                <Text>{problem.date.toString()}</Text>
                            </View>
                        </Card.Content>
                        <Card.Content>
                            {problem.resolved ? (
                                <View style={globalStyles.ratingRow}>
                                    {[...Array(3)].map((_, index) => (
                                        <IconButton
                                            key={index}
                                            icon={
                                                index < problem.priorityRating
                                                    ? 'alert-circle'
                                                    : 'alert-circle-outline'
                                            }
                                            iconColor={colors.red}
                                            size={18}
                                        />
                                    ))}
                                    <Text>{problem.priorityVotesCount}</Text>
                                </View>
                            ) : (
                                <View style={globalStyles.ratingRow}>
                                    {[...Array(5)].map((_, index) => (
                                        <IconButton
                                            key={index}
                                            icon={
                                                index < problem.satisfactionRating
                                                    ? 'star'
                                                    : 'star-outline'
                                            }
                                            size={18}
                                            iconColor={colors.yellow}
                                        />
                                    ))}
                                    <Text>{problem.satisfactionVotesCount}</Text>
                                </View>
                            )}
                        </Card.Content>
                        <Card.Actions>
                            <IconButton
                                icon='comment'
                                size={18}
                            />
                            {/* <Text>{problem.comments}</Text> */}
                        </Card.Actions>
                    </Card>
                )}
            />
            <FAB
                icon='plus'
                onPress={onFabPress}
                style={globalStyles.fab}
            />
        </View>
    )
}
export default Problems
