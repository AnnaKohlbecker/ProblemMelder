import { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import { BaseRoute } from 'react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation'
import { useProblemsQuery } from '~/queries/Problems/useProblemsQuery'
import Header from '~/shared/components/Header'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Marker } from '~/shared/types/Marker'
import BaseMap from '~/shared/views/BaseMap'
import ProblemReport from '~/views/ProblemReport'

type Props = {
    route: BaseRoute
}

const Map = ({ route }: Props) => {
    const [reportProblem, setReportProblem] = useState(false)

    const { data: problems } = useProblemsQuery()

    const onReportProblem = useCallback(() => {
        setReportProblem(true)
    }, [])

    const onClose = useCallback(() => {
        setReportProblem(false)
    }, [])

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

    if (reportProblem) return <ProblemReport onClose={onClose} />

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
