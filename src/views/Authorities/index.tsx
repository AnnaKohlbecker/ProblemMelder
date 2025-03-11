import { Route } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import { Searchbar, Text } from 'react-native-paper'
import { useAuthoritiesQuery } from '~/queries/Authorities/useAuthoritiesQuery'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Route as RouteEnum } from '~/shared/enums/Route'
import Header from '~/shared/views/Header'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import { Authority } from '~/supabase/types'
import AuthorityCard from '~/views/Authorities/components/AuthorityCard'
import { useAuthoritiesSearchLogic } from '~/views/Authorities/hooks/useAuthoritiesSearchLogic'
import AuthorityDetailView from '~/views/AuthorityDetailView'

type Props = {
    route: Route<RouteEnum>
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    filterWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    list: {
        paddingHorizontal: 20,
    },
    listFooter: {
        padding: 35,
    },
})

const Authorities = ({ route }: Props) => {
    const [selectedAuthorityDetails, setSelectedAuthorityDetails] = useState<Authority>()

    const {
        data: authorities,
        isLoading: authoritiesLoading,
        refetch: refetchAuthorities,
        isRefetching: authoritiesRefetching,
    } = useAuthoritiesQuery()

    const [isUserTriggeredRefetch, setIsUserTriggeredRefetch] = useState(false)

    const { searchedAuthorities, search, setSearch } = useAuthoritiesSearchLogic({
        authorities: authorities ?? [],
    })

    const onShowAuthorityDetails = useCallback((authority: Authority) => {
        setSelectedAuthorityDetails(authority)
    }, [])

    const onCloseAuthorityDetails = useCallback(() => {
        refetchAuthorities()
        setSelectedAuthorityDetails(undefined)
    }, [refetchAuthorities])

    const onRefresh = useCallback(() => {
        if (authoritiesLoading || authoritiesRefetching) return

        setIsUserTriggeredRefetch(true)
        refetchAuthorities().finally(() => {
            setIsUserTriggeredRefetch(false)
        })
    }, [authoritiesLoading, authoritiesRefetching, refetchAuthorities])

    if (authoritiesLoading) return <LoadingSpinner />

    return (
        <View style={globalStyles.flexBoxWithColor}>
            <Header route={route} />
            <View style={styles.filterWrapper}>
                <Searchbar
                    style={globalStyles.searchBar}
                    value={search}
                    onChangeText={setSearch}
                    placeholder='Suche'
                />
            </View>
            {searchedAuthorities.length === 0 ? (
                <View style={styles.container}>
                    <Text style={globalStyles.noDataText}>
                        {authorities?.length === 0
                            ? 'Keine Behörden vorhanden.'
                            : 'Keine Behörde gefunden.'}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={searchedAuthorities}
                    style={styles.list}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item: authority, index }) => (
                        <AuthorityCard
                            key={index}
                            authority={authority}
                            onCardPress={() => {
                                onShowAuthorityDetails(authority)
                            }}
                        />
                    )}
                    ListFooterComponent={<View style={styles.listFooter} />}
                    refreshControl={
                        <RefreshControl
                            refreshing={isUserTriggeredRefetch && authoritiesRefetching}
                            onRefresh={onRefresh}
                        />
                    }
                />
            )}
            {selectedAuthorityDetails && (
                <AuthorityDetailView
                    authority={selectedAuthorityDetails}
                    onClose={onCloseAuthorityDetails}
                />
            )}
        </View>
    )
}
export default Authorities
