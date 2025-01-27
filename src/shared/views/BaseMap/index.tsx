import { isNil } from 'lodash'
import { View } from 'react-native'
import MapView, { MapPressEvent, Marker, Region } from 'react-native-maps'
import AnimatedMapRegion from 'react-native-maps/lib/AnimatedRegion'
import { FAB } from 'react-native-paper'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useLocation } from '~/shared/context/LocationContext'
import { useMapRegionLogic } from '~/shared/views/BaseMap/hooks/useMapRegionLogic'
import LoadingSpinner from '~/shared/views/LoadingSpinner'

type Props = {
    onFabPress?: () => void

    onMapPress?: (event: MapPressEvent) => void

    initialFocus?: Region | AnimatedMapRegion
    showCurrentLocation?: boolean

    markers?: Region[]
}

const BaseMap = ({ onFabPress, onMapPress, initialFocus, markers }: Props) => {
    const location = useLocation()

    const { region, onRegionChange } = useMapRegionLogic({ initialFocus })

    return (
        <View style={globalStyles.flexBox}>
            {isNil(location) || isNil(region) ? (
                <LoadingSpinner />
            ) : (
                <View style={globalStyles.flexBox}>
                    <MapView
                        style={globalStyles.flexBox}
                        showsUserLocation
                        showsMyLocationButton
                        region={region}
                        onPress={onMapPress}
                        onMarkerPress={() => {
                            //
                        }}
                        onMarkerSelect={() => {
                            //
                        }}
                        moveOnMarkerPress={false}
                        onRegionChangeComplete={onRegionChange}
                    >
                        {markers?.map((marker) => (
                            <Marker
                                key={`${marker.latitude},${marker.longitude}`}
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
            )}
        </View>
    )
}

export default BaseMap
