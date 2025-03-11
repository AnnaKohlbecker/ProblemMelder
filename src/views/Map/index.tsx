import { ParamListBase, Route, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { isNil } from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import { useProblemsQuery } from '~/queries/Problems/useProblemsQuery'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { Route as RouteEnum } from '~/shared/enums/Route'
import { Marker } from '~/shared/types/Marker'
import BaseMap from '~/shared/views/BaseMap'
import Header from '~/shared/views/Header'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import MapMarker from '~/views/Map/components/MapMarker'
import ProblemDetailView from '~/views/ProblemDetailView'

type Props = {
    route: Route<RouteEnum>
}

const Map = ({ route }: Props) => {
    const { session } = useAuth()
    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()

    const [markerDetails, setMarkerDetails] = useState<Marker | undefined>(undefined)

    const {
        data: problems,
        isLoading: problemsLoading,
        refetch: refetchProblems,
    } = useProblemsQuery()

    const onReportProblem = useCallback(() => {
        navigate(RouteEnum.PROBLEM_REPORT)
    }, [navigate])

    const markers = useMemo(() => {
        return problems
            ?.filter((prob) => prob.status !== ProblemStatus.Cancelled)
            .map((problem): Marker => {
                const [latitude, longitude] = problem.location.split(',')

                return {
                    ...problem,
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                }
            })
    }, [problems])

    if (problemsLoading) return <LoadingSpinner />

    return (
        <>
            <Header route={route} />
            <View style={globalStyles.flexBox}>
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
        </>
    )
}
export default Map
