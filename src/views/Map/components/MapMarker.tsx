import { useMemo } from 'react'
import { Marker, MarkerPressEvent } from 'react-native-maps'
import { problemStatusToIconAndColor } from '~/shared/helpers/ProblemStatusToIconAndColor'
import { Marker as TMarker } from '~/shared/types/Marker'

type Props = {
    marker: TMarker
    onPress?: (event: MarkerPressEvent) => void
}

const MapMarker = ({ marker, onPress }: Props) => {
    const { markerImage } = useMemo(
        () => problemStatusToIconAndColor(marker.status),
        [marker.status],
    )

    return (
        <Marker
            coordinate={marker}
            image={markerImage}
            onPress={onPress}
        />
    )
}

export default MapMarker
