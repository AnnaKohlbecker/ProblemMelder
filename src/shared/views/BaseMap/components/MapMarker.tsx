import { useMemo } from 'react'
import { Marker } from 'react-native-maps'
import { problemStatusToColor } from '~/shared/helpers/ProblemStatusToColor'
import { Marker as TMarker } from '~/shared/types/Marker'

type Props = {
    marker: TMarker
    onPress: () => void
}

const MapMarker = ({ marker, onPress }: Props) => {
    const color = useMemo(() => problemStatusToColor(marker.status), [marker.status])

    return (
        <Marker
            coordinate={marker}
            pinColor={color}
            onPress={onPress}
        />
    )
}

export default MapMarker
