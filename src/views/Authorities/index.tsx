import { Route } from '@react-navigation/native'
import { useCallback } from 'react'
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import { useAuthoritiesQuery } from '~/queries/Authorities/useAuthoritiesQuery'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Route as RouteEnum } from '~/shared/enums/Route'
import Header from '~/shared/views/Header'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import AuthorityListItem from '~/views/Authorities/components/AuthorityListItem'

type Props = {
    route: Route<RouteEnum>
}

const styles = StyleSheet.create({
    list: {
        paddingVertical: 10,
    },
})

const Authorities = ({ route }: Props) => {
    const {
        data: authorities,
        isLoading: authoritiesLoading,
        refetch: refetchAuthorities,
        isRefetching: authoritiesRefetching,
    } = useAuthoritiesQuery()

    const onRefresh = useCallback(() => {
        if (authoritiesLoading || authoritiesRefetching) return

        refetchAuthorities()
    }, [authoritiesLoading, authoritiesRefetching, refetchAuthorities])

    return (
        <View style={globalStyles.flexBox}>
            <Header route={route} />
            <View style={globalStyles.flexBox}>
                {authoritiesLoading ? (
                    <LoadingSpinner />
                ) : (
                    <View style={[globalStyles.flexBox, styles.list]}>
                        <FlatList
                            data={authorities}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <AuthorityListItem item={item} />}
                            refreshControl={
                                <RefreshControl
                                    refreshing={authoritiesRefetching}
                                    onRefresh={onRefresh}
                                />
                            }
                        />
                    </View>
                )}
            </View>
        </View>
    )
}
export default Authorities
