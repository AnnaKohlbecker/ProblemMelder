import { isNil } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { Region } from 'react-native-maps'
import AnimatedMapRegion from 'react-native-maps/lib/AnimatedRegion'
import { useLocation } from '~/shared/context/LocationContext'

type Props = {
    initialFocus?: Region | AnimatedMapRegion
}

export const useMapRegionLogic = ({ initialFocus }: Props) => {
    const [region, setRegion] = useState<Region | AnimatedMapRegion>()

    const location = useLocation()

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

    const focusCurrentLocation = useCallback(() => {
        if (isNil(location)) return

        setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
    }, [location])

    useEffect(() => {
        if (!isNil(initialFocus) || isNil(location) || !isNil(region)) return

        setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
    }, [initialFocus, location, region])

    return {
        region,
        onRegionChange,
        focusCurrentLocation,
    }
}
