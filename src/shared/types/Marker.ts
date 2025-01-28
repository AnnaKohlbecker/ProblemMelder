import { LatLng } from 'react-native-maps'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'

export type Marker = LatLng & {
    id: number
    title: string
    status: ProblemStatus
}
