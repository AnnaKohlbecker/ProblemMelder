import { reverseGeocodeAsync } from 'expo-location'
import isNil from 'lodash/isNil'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useController } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { MapPressEvent, Region } from 'react-native-maps'
import { Text } from 'react-native-paper'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useLocation } from '~/shared/context/LocationContext'
import BaseMap from '~/shared/views/BaseMap'

type Props = {
    name: string
}

const styles = StyleSheet.create({
    header: {
        margin: 10,
    },
    map: {
        borderColor: colors.secondary,
        borderWidth: 1,
        marginHorizontal: 20,
        marginVertical: 10,
    },
})

const LocationSelection = ({ name }: Props) => {
    const [currentAddress, setCurrentAddress] = useState<string>()

    const {
        field: { value, onChange },
    } = useController({ name })

    const currentLocation = useLocation()
    const currentRegion = useMemo(() => {
        if (isNil(currentLocation)) return undefined

        return {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    }, [currentLocation])

    const location = useMemo((): Region | undefined => {
        if (isNil(value)) return undefined

        const [latitude, longitude] = value.split(',')

        return {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    }, [value])

    const onMapPress = useCallback(
        (event: MapPressEvent) => {
            const { latitude, longitude } = event.nativeEvent.coordinate

            onChange(`${latitude},${longitude}`)
        },
        [onChange],
    )

    useEffect(() => {
        if (isNil(location)) return

        reverseGeocodeAsync(location).then(([address]) => {
            setCurrentAddress(address.formattedAddress ?? undefined)
        })
    }, [location])

    return (
        <View style={globalStyles.flexBox}>
            <View style={styles.header}>
                <Text
                    variant='bodyMedium'
                    style={globalStyles.mb}
                >
                    Klicke auf die Karte um einen Standort auszuwählen.
                </Text>
                <Text variant='titleMedium'>Ausgewählter Standort:</Text>
                <Text variant='bodyMedium'>
                    {currentAddress ?? (currentRegion ? 'Automatisch erkannt' : 'Unbekannt')}
                </Text>
            </View>
            <View style={[styles.map, globalStyles.flexBox]}>
                <BaseMap
                    onMapPress={onMapPress}
                    markers={location ? [location] : currentRegion ? [currentRegion] : undefined}
                />
            </View>
        </View>
    )
}

export default LocationSelection
