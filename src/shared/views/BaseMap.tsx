import { isNil } from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import MapView, { MapPressEvent, Marker, Region } from 'react-native-maps'
import AnimatedMapRegion from 'react-native-maps/lib/AnimatedRegion'
import { FAB } from 'react-native-paper'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useLocation } from '~/shared/context/LocationContext'
import { problemStatusToColor } from '~/shared/helpers/ProblemStatusToColor'
import { Marker as TMarker } from '~/shared/types/Marker'

type Props = {
    onFabPress?: () => void

    onMapPress?: (event: MapPressEvent) => void

    markers?: TMarker[]
}

const BaseMap = ({ onFabPress, onMapPress, markers }: Props) => {
    const location = useLocation()

    const [region, setRegion] = useState<Region | AnimatedMapRegion>()

    const currentLocation = useMemo(() => {
        if (isNil(location)) return undefined

        return {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.004,
        }
    }, [location])

    const visibleRegion = useMemo(() => region ?? currentLocation, [currentLocation, region])

    const onRegionChange = useCallback(
        (newRegion: Region) => {
            if (
                Math.abs(newRegion.latitude - region?.latitude) <= 0.0001 ||
                Math.abs(newRegion.longitude - region?.longitude) <= 0.0001
            )
                return

            setRegion(newRegion)
        },
        [region],
    )

    return (
        <View style={globalStyles.flexBox}>
            <MapView
                key={location?.timestamp}
                style={globalStyles.flexBox}
                region={visibleRegion}
                onPress={onMapPress}
                onMarkerPress={() => {
                    //
                }}
                onMarkerSelect={() => {
                    //
                }}
                showsUserLocation={true}
                moveOnMarkerPress={false}
                showsMyLocationButton={true}
                onRegionChangeComplete={onRegionChange}
            >
                {markers?.map((marker) => (
                    <Marker
                        key={marker.id}
                        pinColor={problemStatusToColor(marker.status)}
                        title={marker.title}
                        titleVisibility='visible'
                        coordinate={marker}
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
