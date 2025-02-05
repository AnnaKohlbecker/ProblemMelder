import isNil from 'lodash/isNil'
import { useCallback, useMemo, useState } from 'react'
import { Region } from 'react-native-maps'
import { useLocation } from '~/shared/context/LocationContext'

type Props = {
    onRegionChange: (region: Region) => void
}

export const useRegionLogic = ({ onRegionChange: onRegionChangeProp }: Props) => {
    const [currentRegion, setRegion] = useState<Region>()

    const location = useLocation()
    const userLocation = useMemo(() => {
        if (isNil(location)) return undefined

        return {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.004,
        }
    }, [location])

    /**
     * Region to be displayed on the map
     *
     * 1. If the user set a region on the map (currentRegion), display it
     * 2. If the user location is available, display it
     * 3. Fallback to DHBW Lörrach
     */
    const displayedRegion = useMemo(
        () =>
            currentRegion ??
            userLocation ?? {
                latitude: 47.6170108,
                longitude: 7.6756506,
                latitudeDelta: 0.009,
                longitudeDelta: 0.004,
            },
        [userLocation, currentRegion],
    )

    const onRegionChange = useCallback(
        (newRegion: Region) => {
            onRegionChangeProp(newRegion)

            if (isNil(currentRegion) || currentRegion === userLocation) return

            if (
                // Only change the region if the change is signigicant
                Math.abs(newRegion.latitude - currentRegion?.latitude) <= 0.0001 ||
                Math.abs(newRegion.longitude - currentRegion?.longitude) <= 0.0001
            )
                return

            setRegion(newRegion)
        },
        [onRegionChangeProp, currentRegion, userLocation],
    )

    return {
        region: displayedRegion,
        onRegionChange,
    }
}
