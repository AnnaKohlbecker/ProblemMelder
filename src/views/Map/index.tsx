import { useCallback, useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { globalStyles } from '~/shared/constants/globalStyles'
import BaseMap from '~/shared/views/BaseMap'
import ProblemReport from '~/views/ProblemReport'

const Map = () => {
    const insets = useSafeAreaInsets()

    const [reportProblem, setReportProblem] = useState(false)

    const onReportProblem = useCallback(() => {
        setReportProblem(true)
    }, [])

    const onClose = useCallback(() => {
        setReportProblem(false)
    }, [])

    if (reportProblem) return <ProblemReport onClose={onClose} />

    return (
        <View style={[{ marginTop: insets.top }, globalStyles.flexBox]}>
            <BaseMap onFabPress={onReportProblem} />
        </View>
    )
}
export default Map
