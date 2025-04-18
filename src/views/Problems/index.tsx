import { ParamListBase, Route, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { isAfter } from 'date-fns/isAfter'
import { subWeeks } from 'date-fns/subWeeks'
import isNil from 'lodash/isNil'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import { Badge, FAB, IconButton, Searchbar, Text } from 'react-native-paper'
import { useProblemsQuery } from '~/queries/Problems/useProblemsQuery'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'
import { FilterStatus } from '~/shared/enums/FilterStatus'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { Route as RouteEnum } from '~/shared/enums/Route'
import { ProblemFilterFormData } from '~/shared/types/Filter'
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
    badge: {
        position: 'absolute',
        top: 15,
        right: 20,
    },
})

const Problems = ({ route }: Props) => {
    const { session } = useAuth()
    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const [selectedProblemDetails, setSelectedProblemDetails] = useState<Problem>()
    const [showFilterDialog, setShowFilterDialog] = useState(false)
    const [filterValues, setFilterValues] = useState<ProblemFilterFormData>({
        status: FilterStatus.Inactive,
        categoryId: FilterStatus.Inactive,
        radius: FilterStatus.Inactive,
    })

    const hasActiveFilters = useMemo(() => {
        return (
            filterValues.status !== FilterStatus.Inactive ||
            filterValues.categoryId !== FilterStatus.Inactive ||
            filterValues.radius !== FilterStatus.Inactive
        )
    }, [filterValues])

    const {
        data: problems,
        isLoading: problemsLoading,
        isRefetching: problemsRefetching,
        refetch: refetchProblems,
    } = useProblemsQuery()

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

    const [filteredProblems, setFilteredProblems] = useState<Problem[]>(preFilteredProblems ?? [])

    const shownProblems = useMemo(() => {
        return filteredProblems.filter((problem) => searchedProblems.includes(problem))
    }, [searchedProblems, filteredProblems])

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

    useEffect(() => {
        setSearch('')
        // Set the filtered problems when the problems change
        setFilteredProblems(preFilteredProblems ?? [])
        // Reset the filter values to no filter
        setFilterValues({
            status: FilterStatus.Inactive,
            categoryId: FilterStatus.Inactive,
            radius: FilterStatus.Inactive,
        })
    }, [preFilteredProblems, setSearch])

    if (problemsLoading) {
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
                {hasActiveFilters && <Badge style={styles.badge} />}
            </View>
            {shownProblems.length === 0 ? (
                <View style={styles.container}>
                    <Text style={globalStyles.noDataText}>
                        {problems?.length === 0
                            ? 'Keine Probleme vorhanden.'
                            : 'Kein Problem gefunden.'}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={shownProblems}
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
                    problems={problems ?? []}
                    onClose={() => {
                        refetchProblems()
                        onCloseFilterDialog()
                    }}
                    setFilteredProblems={setFilteredProblems}
                    filterValues={filterValues}
                    setFilterValues={setFilterValues}
                />
            )}
        </View>
    )
}

export default Problems
