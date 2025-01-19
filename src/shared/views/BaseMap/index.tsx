import { isNil } from 'lodash'
import { View } from 'react-native'
import MapView, { Marker, Region } from 'react-native-maps'
import AnimatedMapRegion from 'react-native-maps/lib/AnimatedRegion'
import { Appbar, FAB } from 'react-native-paper'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useLocation } from '~/shared/context/LocationContext'
import { useMapRegionLogic } from '~/shared/views/BaseMap/hooks/useMapRegionLogic'
import LoadingSpinner from '~/shared/views/LoadingSpinner'

type Props = {
    title?: string
    onBackPress?: () => void

    onFabPress?: () => void

    initialFocus?: Region | AnimatedMapRegion
    showCurrentLocation?: boolean
}

const BaseMap = ({
    title = '',
    onBackPress,
    onFabPress,
    initialFocus,
    showCurrentLocation = false,
}: Props) => {
    const location = useLocation()

    const { region, focusCurrentLocation, onRegionChange } = useMapRegionLogic({ initialFocus })

    return (
        <View style={globalStyles.flexBox}>
            <Appbar.Header style={globalStyles.appbar}>
                {!isNil(onBackPress) && <Appbar.BackAction onPress={onBackPress} />}
                <Appbar.Content title={title} />
                <Appbar.Action
                    icon='map-marker'
                    iconColor={colors.primary}
                    onPress={focusCurrentLocation}
                />
            </Appbar.Header>
            {isNil(location) || isNil(region) ? (
                <LoadingSpinner />
            ) : (
                <View style={globalStyles.flexBox}>
                    <MapView
                        style={globalStyles.flexBox}
                        region={region}
                        onRegionChangeComplete={onRegionChange}
                    >
                        {showCurrentLocation && (
                            <Marker
                                coordinate={{
                                    latitude: location.coords.latitude,
                                    longitude: location.coords.longitude,
                                }}
                            />
                        )}
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
