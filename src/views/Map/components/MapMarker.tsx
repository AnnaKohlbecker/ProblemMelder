import { useMemo } from 'react'
import { Marker, MarkerPressEvent } from 'react-native-maps'
import { problemStatusToIconAndColor } from '~/shared/helpers/ProblemStatusToIconAndColor'
import { Marker as TMarker } from '~/shared/types/Marker'

type Props = {
    marker: TMarker
    onPress?: (event: MarkerPressEvent) => void
}

const MapMarker = ({ marker, onPress }: Props) => {
    const { color } = useMemo(() => problemStatusToIconAndColor(marker.status), [marker.status])

    return (
        <Marker
            coordinate={marker}
            pinColor={color}
            onPress={onPress}
        />
    )
}

export default MapMarker
