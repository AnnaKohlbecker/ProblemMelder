import { ParamListBase, Route, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { FAB } from 'react-native-paper'
import { useAuthoritiesQuery } from '~/queries/Authorities/useAuthoritiesQuery'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Route as RouteEnum } from '~/shared/enums/Route'
import { Authority } from '~/shared/models/Authority'
import Header from '~/shared/views/Header'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import AuthorityListItem from '~/views/Management/Authorities/components/AuthorityIListtem'

type Props = {
    route: Route<RouteEnum>
}

const styles = StyleSheet.create({
    list: {
        paddingVertical: 10,
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

    const onEdit = useCallback((authority: Authority) => {}, [])

    const onDelete = useCallback((authority: Authority) => {}, [])

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
                        <View style={[globalStyles.flexBox, styles.list]}>
                            <FlatList
                                data={authorities}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <AuthorityListItem
                                        item={item}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                    />
                                )}
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
