import { ParamListBase, Route, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { isAfter } from 'date-fns/isAfter'
import { subWeeks } from 'date-fns/subWeeks'
import isNil from 'lodash/isNil'
import { useCallback, useMemo, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import { FAB, IconButton, Searchbar, Text } from 'react-native-paper'
import { useProblemsQuery } from '~/queries/Problems/useProblemsQuery'
import { useUserByIdQuery } from '~/queries/UserData/useUserByIdQuery'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { Route as RouteEnum } from '~/shared/enums/Route'
import FilterDialog from '~/shared/views/FilterDialog'
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

const Problems = ({ route }: Props) => {
    const { session } = useAuth()
    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const [selectedProblemDetails, setSelectedProblemDetails] = useState<Problem>()
    const [showFilterDialog, setShowFilterDialog] = useState(false)

    const {
        data: problems,
        isLoading: problemsLoading,
        isRefetching: problemsRefetching,
        refetch: refetchProblems,
    } = useProblemsQuery()

    const { isLoading: userLoading } = useUserByIdQuery({
        userId: session?.user.id,
    })

    const [isUserTriggeredRefetch, setIsUserTriggeredRefetch] = useState(false)

    // Hide old closed and solved problems which are older than 2 weekss
    const preFilteredProblems = useMemo(() => {
        const twoWeeksAgo = subWeeks(new Date(), 2)

        return problems?.filter(
            (problem) =>
                (problem.status !== ProblemStatus.Cancelled &&
                    problem.status !== ProblemStatus.Done) ||
                isNil(problem.closedDate) ||
                isAfter(problem.closedDate, twoWeeksAgo),
        )
    }, [problems])

    const { searchedProblems, search, setSearch } = useProblemsSearchLogic({
        problems: preFilteredProblems ?? [],
    })

    const [filteredProblems, setFilteredProblems] = useState<Problem[]>(searchedProblems)

    const onReportProblem = useCallback(() => {
        navigate(RouteEnum.PROBLEM_REPORT)
    }, [navigate])

    const onShowProblemDetails = useCallback((problem: Problem) => {
        setSelectedProblemDetails(problem)
    }, [])

    const onCloseProblemDetails = useCallback(() => {
        refetchProblems()
        setSelectedProblemDetails(undefined)
    }, [refetchProblems])

    const onCloseFilterDialog = useCallback(() => {
        setShowFilterDialog(false)
    }, [])

    const onRefresh = useCallback(() => {
        if (problemsLoading || problemsRefetching) return

        setIsUserTriggeredRefetch(true)
        refetchProblems().finally(() => {
            setIsUserTriggeredRefetch(false)
        })
    }, [problemsLoading, problemsRefetching, refetchProblems])

    if (userLoading || problemsLoading) {
        return <LoadingSpinner />
    }

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
                <IconButton
                    icon='filter'
                    onPress={() => {
                        setShowFilterDialog(true)
                    }}
                    style={globalStyles.filterButton}
                    iconColor={colors.white}
                />
            </View>
            {filteredProblems.length === 0 ? (
                <View style={styles.container}>
                    <Text style={globalStyles.noDataText}>
                        {problems?.length === 0
                            ? 'Keine Probleme vorhanden.'
                            : 'Kein Problem gefunden.'}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={filteredProblems}
                    style={styles.list}
                    renderItem={({ item: problem, index }) => (
                        <ProblemCard
                            key={index}
                            problem={problem}
                            onCardPress={() => {
                                onShowProblemDetails(problem)
                            }}
                        />
                    )}
                    ListFooterComponent={<View style={styles.listFooter} />}
                    refreshControl={
                        <RefreshControl
                            refreshing={isUserTriggeredRefetch && problemsRefetching}
                            onRefresh={onRefresh}
                        />
                    }
                />
            )}
            {!isNil(session) && (
                <FAB
                    icon='plus'
                    onPress={onReportProblem}
                    style={globalStyles.fab}
                />
            )}
            {selectedProblemDetails && (
                <ProblemDetailView
                    problem={selectedProblemDetails}
                    onClose={onCloseProblemDetails}
                />
            )}
            {showFilterDialog && (
                <FilterDialog
                    problems={searchedProblems}
                    onClose={onCloseFilterDialog}
                    setFilteredProblems={setFilteredProblems}
                />
            )}
        </View>
    )
}

export default Problems
