import { reverseGeocodeAsync } from 'expo-location'
import isNil from 'lodash/isNil'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { MapPressEvent } from 'react-native-maps'
import { Text } from 'react-native-paper'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useLocation } from '~/shared/context/LocationContext'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { Marker } from '~/shared/types/Marker'
import BaseMap from '~/shared/views/BaseMap'

type Props = {
    name: string
}

const styles = StyleSheet.create({
    error: {
        color: colors.primary,
    },
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

    const { trigger } = useForm()

    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({
        name,
        rules: {
            required: 'Bitte wähle einen Standort.',
        },
    })

    /**
     * Parse the current value to a valid Region object
     */
    const location = useMemo((): Marker | undefined => {
        if (isNil(value)) return undefined

        const [latitude, longitude] = value.split(',')

        return {
            id: -1,
            status: ProblemStatus.ToDo,
            title: 'Ausgewählter Standort',
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
        }
    }, [value])

    /**
     * Change the location if the user presses the map
     */
    const onMapPress = useCallback(
        (event: MapPressEvent) => {
            const { latitude, longitude } = event.nativeEvent.coordinate

            onChange(`${latitude},${longitude}`)
        },
        [onChange],
    )

    /**
     * Automatically recognize location if possible
     */
    const currentLocation = useLocation()
    useEffect(() => {
        if (isNil(currentLocation) || !isNil(location)) return undefined

        onChange(`${currentLocation.coords.latitude},${currentLocation.coords.longitude}`)
    }, [currentLocation, location, onChange])

    /**
     * On location change update the address
     */
    useEffect(() => {
        if (isNil(location)) return

        reverseGeocodeAsync(location).then(([address]) => {
            trigger()
            setCurrentAddress(address.formattedAddress ?? undefined)
        })
    }, [location, trigger])

    return (
        <View style={globalStyles.flexBox}>
            <View style={styles.header}>
                <Text
                    variant='bodyMedium'
                    style={globalStyles.mb}
                >
                    Klicke auf die Karte.
                </Text>
                <Text variant='titleMedium'>Ausgewählter Standort:</Text>
                <Text
                    variant='bodyMedium'
                    style={globalStyles.mb}
                >
                    {currentAddress ?? 'Unbekannt'}
                </Text>
                {error && <Text style={styles.error}>{error.message}</Text>}
            </View>
            <View style={[styles.map, globalStyles.flexBox]}>
                <BaseMap
                    onMapPress={onMapPress}
                    markers={location ? [location] : undefined}
                />
            </View>
        </View>
    )
}

export default LocationSelection
