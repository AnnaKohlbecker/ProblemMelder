import { isNil } from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import MapView, {
    MapPressEvent,
    PROVIDER_DEFAULT,
    PROVIDER_GOOGLE,
    Region,
} from 'react-native-maps'
import { FAB } from 'react-native-paper'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useLocation } from '~/shared/context/LocationContext'
import { Marker as TMarker } from '~/shared/types/Marker'
import DetailPopup from '~/shared/views/BaseMap/components/DetailPopup'
import MapMarker from '~/shared/views/BaseMap/components/MapMarker'
import { customMapStyle } from '~/shared/views/BaseMap/constants/customMapStyle'

type Props = {
    onFabPress?: () => void

    onMapPress?: (event: MapPressEvent) => void

    markers?: TMarker[]
}

const IS_ANDROID = Platform.OS === 'android'

const BaseMap = ({ onFabPress, onMapPress, markers }: Props) => {
    const location = useLocation()

    const [markerDetails, setMarkerDetails] = useState<TMarker>()
    const [region, setRegion] = useState<Region>()

    const currentLocation = useMemo(() => {
        if (isNil(location)) return undefined

        return {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.004,
        }
    }, [location])

    const visibleRegion = useMemo(
        () =>
            region ??
            currentLocation ?? {
                latitude: 47.6170108,
                longitude: 7.6756506,
                latitudeDelta: 0.009,
                longitudeDelta: 0.004,
            },
        [currentLocation, region],
    )

    const provider = useMemo(() => (IS_ANDROID ? PROVIDER_GOOGLE : PROVIDER_DEFAULT), [])

    const onRegionChange = useCallback(
        (newRegion: Region) => {
            if (isNil(region) || region === currentLocation) return

            if (
                Math.abs(newRegion.latitude - region?.latitude) <= 0.0001 ||
                Math.abs(newRegion.longitude - region?.longitude) <= 0.0001
            )
                return

            setRegion(newRegion)
        },
        [currentLocation, region],
    )

    return (
        <View style={globalStyles.flexBox}>
            <MapView
                key={location?.timestamp}
                provider={provider}
                style={StyleSheet.absoluteFillObject}
                region={visibleRegion}
                onPress={onMapPress}
                loadingEnabled={true}
                toolbarEnabled={false}
                showsUserLocation={true}
                showsMyLocationButton={true}
                onRegionChangeComplete={onRegionChange}
                customMapStyle={customMapStyle}
            >
                {markers?.map((marker) => (
                    <MapMarker
                        key={marker.id}
                        marker={marker}
                        onPress={() => setMarkerDetails(marker)}
                    />
                ))}
            </MapView>
            {markerDetails && (
                <DetailPopup
                    marker={markerDetails}
                    onClose={() => setMarkerDetails(undefined)}
                />
            )}
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
