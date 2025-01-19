import {
    getCurrentPositionAsync,
    LocationObject,
    requestForegroundPermissionsAsync,
} from 'expo-location'
import { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { LocationContext } from '~/shared/context/LocationContext'

type Props = PropsWithChildren<unknown>

const LocationProvider = ({ children }: Props) => {
    const [currentLocation, setCurrentLocation] = useState<LocationObject>()

    const getCurrentLocation = useCallback(async () => {
        const { status } = await requestForegroundPermissionsAsync()

        if (status !== 'granted') {
            Alert.alert(
                'Ohne Standortberechtigung ist keine automatische Standortermittlung möglich.',
            )
            return
        }

        setCurrentLocation(await getCurrentPositionAsync())
    }, [])

    useEffect(() => {
        getCurrentLocation()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <LocationContext.Provider value={currentLocation}>{children}</LocationContext.Provider>
}

export default LocationProvider
