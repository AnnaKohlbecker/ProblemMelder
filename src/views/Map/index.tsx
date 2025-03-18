import { ParamListBase, Route, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { isAfter } from 'date-fns/isAfter'
import { subWeeks } from 'date-fns/subWeeks'
import { isNil } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Badge, IconButton } from 'react-native-paper'
import { useProblemsQuery } from '~/queries/Problems/useProblemsQuery'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'
import { FilterStatus } from '~/shared/enums/FilterStatus'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { Route as RouteEnum } from '~/shared/enums/Route'
import { ProblemFilterFormData } from '~/shared/types/Filter'
import { Marker } from '~/shared/types/Marker'
import BaseMap from '~/shared/views/BaseMap'
import FilterDialog from '~/shared/views/FilterDialog'
import Header from '~/shared/views/Header'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import { Problem } from '~/supabase/types'
import MapMarker from '~/views/Map/components/MapMarker'
import ProblemDetailView from '~/views/ProblemDetailView'

type Props = {
    route: Route<RouteEnum>
}

const styles = StyleSheet.create({
    fab: {
        top: 0,
        margin: 16,
        position: 'absolute',
        left: 0,
        zIndex: 10,
    },
    badge: {
        position: 'absolute',
        top: 2,
        right: 2,
    },
})

const Map = ({ route }: Props) => {
    const { session } = useAuth()
    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()

    const {
        data: problems,
        isLoading: problemsLoading,
        refetch: refetchProblems,
    } = useProblemsQuery()

    const [showFilterDialog, setShowFilterDialog] = useState(false)
    const [markerDetails, setMarkerDetails] = useState<Marker | undefined>(undefined)
    const [filterValues, setFilterValues] = useState<ProblemFilterFormData>({
        status: FilterStatus.Inactive,
        categoryId: FilterStatus.Inactive,
        radius: FilterStatus.Inactive,
    })

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

    const [filteredProblems, setFilteredProblems] = useState<Problem[]>(preFilteredProblems ?? [])

    const hasActiveFilters = useMemo(() => {
        return (
            filterValues.status !== FilterStatus.Inactive ||
            filterValues.categoryId !== FilterStatus.Inactive ||
            filterValues.radius !== FilterStatus.Inactive
        )
    }, [filterValues])

    const onReportProblem = useCallback(() => {
        navigate(RouteEnum.PROBLEM_REPORT)
    }, [navigate])

    const onCloseFilterDialog = useCallback(() => {
        setShowFilterDialog(false)
    }, [])

    useEffect(() => {
        setFilteredProblems(preFilteredProblems ?? [])
    }, [preFilteredProblems])

    const markers = useMemo(() => {
        return filteredProblems.map((problem): Marker => {
            const [latitude, longitude] = problem.location.split(',')

            return {
                ...problem,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
            }
        })
    }, [filteredProblems])

    useEffect(() => {
        // Set the filtered problems when the problems change
        setFilteredProblems(preFilteredProblems ?? [])
        // Reset the filter values to no filter
        setFilterValues({
            status: FilterStatus.Inactive,
            categoryId: FilterStatus.Inactive,
            radius: FilterStatus.Inactive,
        })
    }, [preFilteredProblems])

    if (problemsLoading) return <LoadingSpinner />

    return (
        <>
            <Header route={route} />
            <View style={globalStyles.flexBox}>
                <View style={styles.fab}>
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
                <BaseMap<Marker>
                    markers={markers}
                    showFab={!isNil(session)}
                    MarkerComponent={MapMarker}
                    onMarkerPressed={setMarkerDetails}
                    onFabPress={onReportProblem}
                />
            </View>
            {markerDetails && (
                <ProblemDetailView
                    problem={markerDetails}
                    onClose={() => {
                        refetchProblems()
                        setMarkerDetails(undefined)
                    }}
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
        </>
    )
}
export default Map
