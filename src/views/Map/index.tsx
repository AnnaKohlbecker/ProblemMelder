import { ParamListBase, Route, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { isNil } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useProblemsQuery } from '~/queries/Problems/useProblemsQuery'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { Route as RouteEnum } from '~/shared/enums/Route'
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
    const [filteredProblems, setFilteredProblems] = useState<Problem[]>(problems ?? [])
    const [markerDetails, setMarkerDetails] = useState<Marker | undefined>(undefined)

    const onReportProblem = useCallback(() => {
        navigate(RouteEnum.PROBLEM_REPORT)
    }, [navigate])

    const onCloseFilterDialog = useCallback(() => {
        setShowFilterDialog(false)
    }, [])

    useEffect(() => {
        setFilteredProblems(problems ?? [])
    }, [problems])

    const markers = useMemo(() => {
        return filteredProblems
            .filter((prob) => prob.status !== ProblemStatus.Cancelled)
            .map((problem): Marker => {
                const [latitude, longitude] = problem.location.split(',')

                return {
                    ...problem,
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                }
            })
    }, [filteredProblems])

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
                />
            )}
        </>
    )
}
export default Map
