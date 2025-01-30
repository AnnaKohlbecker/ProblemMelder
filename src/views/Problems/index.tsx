import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import { Alert, FlatList, View } from 'react-native'
import { Card, FAB, IconButton, Text } from 'react-native-paper'
import { BaseRoute } from 'react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation'
import { useImageByNameQuery } from '~/queries/Problems/useImageByNameQuery'
import { useProblemsQuery } from '~/queries/Problems/useProblemsQuery'
import { useUserByIdQuery } from '~/queries/Users/useUserByIdQuery'
import Header from '~/shared/components/Header'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import LoadingSpinner from '~/shared/views/LoadingSpinner'

type Props = {
    route: BaseRoute
}

type Problem = {
    id: number
    title: string
    location: string
    description: string
    image: string
    status: ProblemStatus
    authorityId: number
    userId: string
    date: Date
    address?: string
    priorityRating: number
    imageUri?: string
}

const Problems = ({ route }: Props) => {
    const { session } = useAuth()
    const { isLoading: userLoading, error: userError } = useUserByIdQuery({
        userId: session?.user.id,
    })

    const { data: problems, isLoading: problemsLoading, error: problemsError } = useProblemsQuery()
    const { data: imageUris } = useImageByNameQuery({ problems })

    const [cardProblems, setCardProblems] = useState<Problem[]>([])

    useEffect(() => {
        if (!problems) return

        const fetchAddressesAndImages = async () => {
            const updatedProblems = await Promise.all(
                problems.map(async (problem) => {
                    let address = 'Unknown Location'
                    if (problem.location) {
                        const [latitude, longitude] = problem.location.split(',').map(Number)
                        const [location] = await Location.reverseGeocodeAsync({
                            latitude,
                            longitude,
                        })
                        address =
                            location?.formattedAddress ??
                            `${location.street ?? ''}, ${location.city ?? ''}, ${location.country ?? ''}`
                    }

                    return {
                        ...problem,
                        address,
                        imageUri:
                            imageUris?.find(
                                (imageUri) => Object.keys(imageUri)[0] === problem.image,
                            )?.[problem.image] || '',
                    }
                }),
            )

            setCardProblems(updatedProblems)
        }

        fetchAddressesAndImages()
    }, [problems, imageUris])

    useEffect(() => {
        if (userError || problemsError) {
            Alert.alert('Error', 'An error occurred while fetching data.')
        }
    }, [userError, problemsError])

    if (userLoading || problemsLoading) return <LoadingSpinner />

    return (
        <View style={globalStyles.flexBox}>
            <Header route={route} />
            <FlatList
                data={cardProblems}
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
                                <Text>{problem.date.toString()}</Text>
                            </View>
                        </Card.Content>
                        <Card.Actions>
                            <IconButton
                                icon='comment'
                                size={18}
                            />
                        </Card.Actions>
                    </Card>
                )}
            />
            <FAB
                icon='plus'
                onPress={() => {
                    // eslint-disable-next-line no-console
                    console.log('FAB pressed')
                }}
                style={globalStyles.fab}
            />
        </View>
    )
}

export default Problems
