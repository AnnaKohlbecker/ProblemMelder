import { ParamListBase, Route, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useCallback } from 'react'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { Searchbar, Text } from 'react-native-paper'
import { useAuthoritiesQuery } from '~/queries/Authorities/useAuthoritiesQuery'
import { useEmployeeQuery } from '~/queries/UserData/useEmployeeQuery'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Route as RouteEnum } from '~/shared/enums/Route'
import { Authority } from '~/shared/models/Authority'
import Header from '~/shared/views/Header'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import AuthorityEmployeeGroup from '~/views/Management/Employees/components/AuthorityEmployeeGroup'
import { useEmployeeSearchLogic } from '~/views/Management/Employees/hooks/useEmployeeSearchLogic'

type Props = {
    route: Route<RouteEnum>
}

const styles = StyleSheet.create({
    filterWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    list: {
        paddingVertical: 10,
    },
})

const EmployeeManagement = ({ route }: Props) => {
    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()

    const onClose = useCallback(() => {
        navigate(RouteEnum.MANAGEMENT)
    }, [navigate])

    const {
        data: employees,
        isLoading: employeesLoading,
        refetch: refetchEmployees,
    } = useEmployeeQuery()
    const { data: authorities, isLoading: authoritiesLoading } = useAuthoritiesQuery()

    const { filteredEmployees, search, setSearch } = useEmployeeSearchLogic({
        employees: employees ?? [],
    })

    const onDelete = useCallback(() => {
        refetchEmployees()
    }, [refetchEmployees])

    const renderItem = useCallback<ListRenderItem<Authority>>(
        ({ item }) => {
            return (
                <AuthorityEmployeeGroup
                    authority={item}
                    employees={filteredEmployees}
                    onDelete={onDelete}
                    searching={search !== ''}
                />
            )
        },
        [filteredEmployees, onDelete, search],
    )

    return (
        <View style={globalStyles.flexBoxWithColor}>
            <Header
                route={route}
                onClose={onClose}
            />
            {employeesLoading || authoritiesLoading ? (
                <LoadingSpinner />
            ) : (
                <View style={globalStyles.flexBox}>
                    <View style={styles.filterWrapper}>
                        <Searchbar
                            style={globalStyles.searchBar}
                            value={search}
                            onChangeText={setSearch}
                            placeholder='Suchen'
                        />
                    </View>
                    <View style={globalStyles.flexBox}>
                        {filteredEmployees.length === 0 ? (
                            <View style={globalStyles.flexCenter}>
                                <Text style={globalStyles.noDataText}>
                                    Keine Mitarbeitenden gefunden
                                </Text>
                            </View>
                        ) : (
                            <FlatList<Authority>
                                data={authorities ?? []}
                                renderItem={renderItem}
                                keyExtractor={(dep) => dep.id.toString()}
                                contentContainerStyle={styles.list}
                            />
                        )}
                    </View>
                </View>
            )}
        </View>
    )
}

export default EmployeeManagement
