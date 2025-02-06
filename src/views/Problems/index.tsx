import { ParamListBase, Route, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useCallback, useMemo, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import { FAB, Searchbar, Text } from 'react-native-paper'
import { useProblemsQuery } from '~/queries/Problems/useProblemsQuery'
import { useUserByIdQuery } from '~/queries/UserData/useUserByIdQuery'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'
import { Route as RouteEnum } from '~/shared/enums/Route'
import { Problem } from '~/shared/models/Problem'
import Filter from '~/shared/views/Filter'
import Header from '~/shared/views/Header'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import ProblemCard from '~/views/Problems/components/ProblemCard'
import ProblemDetails from '~/views/Problems/components/ProblemDetails'
import { useProblemsFilterLogic } from '~/views/Problems/hooks/useProblemFilterLogic'
import { useProblemsSearchLogic } from '~/views/Problems/hooks/useProblemsSearchLogic'

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

const Problems = ({ route }: Props) => {
    const { session } = useAuth()
    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const [selectedProblemDetails, setSelectedProblemDetails] = useState<Problem>()

    const { isLoading: userLoading } = useUserByIdQuery({
        userId: session?.user.id,
    })
    const {
        data: problems,
        isLoading: problemsLoading,
        isRefetching: problemsRefetching,
        refetch: refetchProblems,
    } = useProblemsQuery()

    const { searchedProblems, search, setSearch } = useProblemsSearchLogic({
        problems: problems ?? [],
    })

    const { filteredProblems, filter, setFilter } = useProblemsFilterLogic({
        problems: problems ?? [],
    })

    const searchedAndFilteredProblems = useMemo(() => {
        return filteredProblems.filter((problem) =>
            searchedProblems.some((searchedProblem) => searchedProblem.id === problem.id),
        )
    }, [filteredProblems, searchedProblems])

    const onReportProblem = useCallback(() => {
        navigate(RouteEnum.PROBLEM_REPORT)
    }, [navigate])

    const onShowProblemDetails = useCallback((problem: Problem) => {
        setSelectedProblemDetails(problem)
    }, [])

    const onCloseProblemDetails = useCallback(() => {
        setSelectedProblemDetails(undefined)
    }, [])

    const onRefresh = useCallback(() => {
        if (problemsLoading || problemsRefetching) return

        refetchProblems()
    }, [problemsLoading, problemsRefetching, refetchProblems])

    if (userLoading || problemsLoading) return <LoadingSpinner />

    return (
        <View style={globalStyles.flexBox}>
            <Header route={route} />
            <View style={styles.filterWrapper}>
                <Searchbar
                    style={globalStyles.searchBar}
                    value={search}
                    onChangeText={setSearch}
                    placeholder='Suche'
                />
                <Filter
                    value={filter}
                    onChangeFilter={setFilter}
                />
            </View>
            {searchedAndFilteredProblems.length === 0 ? (
                <View style={styles.container}>
                    <Text style={globalStyles.noDataText}>
                        {problems?.length === 0
                            ? 'Keine Probleme vorhanden.'
                            : 'Kein Problem gefunden.'}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={searchedAndFilteredProblems}
                    style={styles.list}
                    renderItem={({ item: problem, index }) => (
                        <ProblemCard
                            key={index}
                            problem={problem}
                            onCardPress={() => onShowProblemDetails(problem)}
                        />
                    )}
                    ListFooterComponent={<View style={styles.listFooter} />}
                    refreshControl={
                        <RefreshControl
                            refreshing={problemsRefetching}
                            onRefresh={onRefresh}
                        />
                    }
                />
            )}
            <FAB
                icon='plus'
                onPress={onReportProblem}
                style={globalStyles.fab}
            />
            {selectedProblemDetails && (
                <ProblemDetails
                    problem={selectedProblemDetails}
                    onClose={onCloseProblemDetails}
                />
            )}
        </View>
    )
}

export default Problems
