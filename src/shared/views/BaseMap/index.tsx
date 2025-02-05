import { isNil } from 'lodash'
import { ElementType, useMemo } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import MapView, {
    MapPressEvent,
    Marker,
    MarkerPressEvent,
    PROVIDER_DEFAULT,
    PROVIDER_GOOGLE,
} from 'react-native-maps'
import { FAB } from 'react-native-paper'
import { globalStyles } from '~/shared/constants/globalStyles'
import { MarkerBaseInfo } from '~/shared/types/MarkerBaseInfo'
import { customMapStyle } from '~/shared/views/BaseMap/constants/customMapStyle'
import { useMarkerLogic } from '~/shared/views/BaseMap/hooks/useMarkerLogic'
import { useRegionLogic } from '~/shared/views/BaseMap/hooks/useRegionLogic'

type MarkerProps<T extends MarkerBaseInfo> = {
    marker: T
    onPress?: (event: MarkerPressEvent) => void
}

type Props<T extends MarkerBaseInfo> = {
    onFabPress?: () => void

    onMapPress?: (event: MapPressEvent) => void

    markers?: T[]
} & (
    | {
          MarkerComponent: ElementType<MarkerProps<T>>
          onMarkerPressed: (marker: T) => void
      }
    | { MarkerComponent?: never; onMarkerPressed?: never }
)

const IS_ANDROID = Platform.OS === 'android'

const BaseMap = <T extends MarkerBaseInfo = MarkerBaseInfo>({
    onFabPress,
    onMapPress,
    markers,
    MarkerComponent,
    onMarkerPressed,
}: Props<T>) => {
    const provider = useMemo(() => (IS_ANDROID ? PROVIDER_GOOGLE : PROVIDER_DEFAULT), [])

    const MapMarker = useMemo(() => MarkerComponent ?? Marker, [MarkerComponent])

    const { displayedMarkers, updateMarkers } = useMarkerLogic<T>({ markers })
    const { region, onRegionChange } = useRegionLogic({ onRegionChange: updateMarkers })

    return (
        <View style={globalStyles.flexBox}>
            <MapView
                region={region}
                provider={provider}
                onPress={onMapPress}
                loadingEnabled={true}
                toolbarEnabled={false}
                showsUserLocation={true}
                showsMyLocationButton={true}
                customMapStyle={customMapStyle}
                style={StyleSheet.absoluteFillObject}
                onRegionChangeComplete={onRegionChange}
            >
                {displayedMarkers.map((marker) => (
                    <MapMarker
                        key={marker.id}
                        marker={marker}
                        coordinate={marker}
                        onPress={() => onMarkerPressed?.(marker)}
                    />
                ))}
            </MapView>
            {!isNil(onFabPress) && (
                <FAB
                    icon='plus'
                    onPress={onFabPress}
                    style={globalStyles.fab}
                />
            )}
        </View>
    )
}

export default BaseMap
