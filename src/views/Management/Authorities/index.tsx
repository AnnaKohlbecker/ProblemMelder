import { ParamListBase, Route, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Card, FAB, Text } from 'react-native-paper'
import { useAuthoritiesQuery } from '~/queries/Authorities/useAuthoritiesQuery'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Route as RouteEnum } from '~/shared/enums/Route'
import Header from '~/shared/views/Header'
import LoadingSpinner from '~/shared/views/LoadingSpinner'

type Props = {
    route: Route<RouteEnum>
}

const styles = StyleSheet.create({
    card: {
        margin: 20,
        padding: 10,
    },
})

const AuthoritiesManagement = ({ route }: Props) => {
    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()

    const { data: authorities, isLoading: authoritiesLoading } = useAuthoritiesQuery()

    const onClose = useCallback(() => {
        navigate(RouteEnum.MANAGEMENT)
    }, [navigate])

    const onAdd = useCallback(() => {
        // TODO
    }, [])

    return (
        <View style={globalStyles.flexBox}>
            <Header
                route={route}
                onClose={onClose}
            />
            <View style={globalStyles.flexBox}>
                {authoritiesLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <View style={globalStyles.flexBox}>
                            <FlatList
                                data={authorities}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => {
                                    return (
                                        <Card style={[globalStyles.card, styles.card]}>
                                            <Text variant='headlineMedium'>{item.name}</Text>
                                            <Text>@{item.domain}</Text>
                                        </Card>
                                    )
                                }}
                            />
                        </View>
                        <FAB
                            icon='plus'
                            onPress={onAdd}
                            style={globalStyles.fab}
                        />
                    </>
                )}
            </View>
        </View>
    )
}

export default AuthoritiesManagement
