import { ParamListBase, Route, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { isBefore } from 'date-fns/isBefore'
import { subWeeks } from 'date-fns/subWeeks'
import isNil from 'lodash/isNil'
import { useCallback, useMemo, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import { Searchbar, Text } from 'react-native-paper'
import { useProblemsQuery } from '~/queries/Problems/useProblemsQuery'
import { globalStyles } from '~/shared/constants/globalStyles'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { Route as RouteEnum } from '~/shared/enums/Route'
import Header from '~/shared/views/Header'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import { Problem } from '~/supabase/types'
import ProblemDetailView from '~/views/ProblemDetailView'
import ProblemCard from '~/views/Problems/components/ProblemCard'
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

const Archive = ({ route }: Props) => {
    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const [selectedProblemDetails, setSelectedProblemDetails] = useState<Problem>()

    const onClose = useCallback(() => {
        navigate(RouteEnum.MANAGEMENT)
    }, [navigate])

    const {
        data: problems,
        isLoading: problemsLoading,
        isRefetching: problemsRefetching,
        refetch: refetchProblems,
    } = useProblemsQuery()

    // Hide old closed and solved problems which are older than 2 weekss
    const preFilteredProblems = useMemo(() => {
        const twoWeeksAgo = subWeeks(new Date(), 2)

        return problems?.filter(
            (problem) =>
                (problem.status === ProblemStatus.Cancelled ||
                    problem.status === ProblemStatus.Done) &&
                !isNil(problem.closedDate) &&
                isBefore(problem.closedDate, twoWeeksAgo),
        )
    }, [problems])

    const { searchedProblems, search, setSearch } = useProblemsSearchLogic({
        problems: preFilteredProblems ?? [],
    })

    const onShowProblemDetails = useCallback((problem: Problem) => {
        setSelectedProblemDetails(problem)
    }, [])

    const onCloseProblemDetails = useCallback(() => {
        setSelectedProblemDetails(undefined)
        refetchProblems()
    }, [refetchProblems])

    const onRefresh = useCallback(() => {
        if (problemsLoading || problemsRefetching) return

        refetchProblems()
    }, [problemsLoading, problemsRefetching, refetchProblems])

    return (
        <View style={globalStyles.flexBoxWithColor}>
            <Header
                route={route}
                onClose={onClose}
            />
            {problemsLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <View style={styles.filterWrapper}>
                        <Searchbar
                            style={globalStyles.searchBar}
                            value={search}
                            onChangeText={setSearch}
                            placeholder='Suche'
                        />
                    </View>
                    {searchedProblems.length === 0 ? (
                        <View style={styles.container}>
                            <Text style={globalStyles.noDataText}>
                                {problems?.length === 0
                                    ? 'Keine Probleme vorhanden.'
                                    : 'Kein Problem gefunden.'}
                            </Text>
                        </View>
                    ) : (
                        <FlatList
                            data={searchedProblems}
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
                    {selectedProblemDetails && (
                        <ProblemDetailView
                            problem={selectedProblemDetails}
                            onClose={onCloseProblemDetails}
                        />
                    )}
                </>
            )}
        </View>
    )
}

export default Archive
