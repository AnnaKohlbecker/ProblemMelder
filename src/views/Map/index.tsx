import { ParamListBase, Route, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import { useProblemsQuery } from '~/queries/Problems/useProblemsQuery'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Route as RouteEnum } from '~/shared/enums/Route'
import { Marker } from '~/shared/types/Marker'
import BaseMap from '~/shared/views/BaseMap'
import Header from '~/shared/views/Header'
import MapMarker from '~/views/Map/components/MapMarker'
import ProblemDetails from '~/views/Problems/components/ProblemDetails'

type Props = {
    route: Route<RouteEnum>
}

const Map = ({ route }: Props) => {
    const { data: problems } = useProblemsQuery()
    const [markerDetails, setMarkerDetails] = useState<Marker | undefined>(undefined)
    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()

    const onReportProblem = useCallback(() => {
        navigate(RouteEnum.PROBLEM_REPORT)
    }, [navigate])

    const markers = useMemo(() => {
        return problems?.map((problem): Marker => {
            const [latitude, longitude] = problem.location.split(',')

            return {
                ...problem,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
            }
        })
    }, [problems])

    return (
        <>
            <Header route={route} />
            <View style={globalStyles.flexBox}>
                <BaseMap<Marker>
                    markers={markers}
                    MarkerComponent={MapMarker}
                    onMarkerPressed={setMarkerDetails}
                    onFabPress={onReportProblem}
                />
                {markerDetails && (
                    <ProblemDetails
                        problem={markerDetails}
                        onClose={() => setMarkerDetails(undefined)}
                    />
                )}
            </View>
        </>
    )
}
export default Map
