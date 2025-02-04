import { ParamListBase, Route, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { useProblemsQuery } from '~/queries/Problems/useProblemsQuery'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Route as RouteEnum } from '~/shared/enums/Route'
import { Marker } from '~/shared/types/Marker'
import BaseMap from '~/shared/views/BaseMap'
import Header from '~/shared/views/Header'

type Props = {
    route: Route<RouteEnum>
}

const Map = ({ route }: Props) => {
    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const { data: problems } = useProblemsQuery()

    const onReportProblem = useCallback(() => {
        navigate(RouteEnum.PROBLEM_REPORT)
    }, [navigate])

    const markers = useMemo(() => {
        return problems?.map((problem): Marker => {
            const [latitude, longitude] = problem.location.split(',')

            return {
                id: problem.id,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                title: problem.title,
                status: problem.status,
            }
        })
    }, [problems])

    return (
        <>
            <Header route={route} />
            <View style={globalStyles.flexBox}>
                <BaseMap
                    markers={markers}
                    onFabPress={onReportProblem}
                />
            </View>
        </>
    )
}
export default Map
