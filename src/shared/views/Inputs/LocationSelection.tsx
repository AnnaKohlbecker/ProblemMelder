import { reverseGeocodeAsync } from 'expo-location'
import isNil from 'lodash/isNil'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { MapPressEvent } from 'react-native-maps'
import { Text } from 'react-native-paper'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useDialog } from '~/shared/context/DialogContext'
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

type Marker = {
    id: string
    latitude: number
    longitude: number
}

const LocationSelection = ({ name }: Props) => {
    const [currentAddress, setCurrentAddress] = useState<string>()
    const [showInfo, setShowInfo] = useState(false)
    const showDialog = useDialog()

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
    const location = useMemo(() => {
        if (isNil(value)) return undefined

        const [latitude, longitude] = value.split(',')

        return {
            id: value,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
        }
    }, [value])

    /**
     * Change the location if the user presses the map
     */
    const onMapPress = useCallback(
        (event: MapPressEvent) => {
            setShowInfo(true)
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

        if (!showInfo) {
            showDialog({
                title: 'Aktuell ist dein Standort ausgewählt. Klicke auf die Karte, um den Standort zu wechseln.',
                description: '',
                onAccept: () => {
                    setShowInfo(true)
                },
                dismissHidden: true,
                acceptLabel: 'Okay',
            })
        }

        onChange(`${currentLocation.coords.latitude},${currentLocation.coords.longitude}`)
    }, [currentLocation, location, onChange, showDialog, showInfo])

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
                    Klicke auf die Karte zur Standortauswahl.
                </Text>
                <Text variant='titleMedium'>Ausgewählter Standort:</Text>
                <Text
                    variant='bodyMedium'
                    style={globalStyles.mb}
                >
                    {currentAddress ?? 'Unbekannt'}
                </Text>
                {error && <Text style={globalStyles.error}>{error.message}</Text>}
            </View>
            <View style={[styles.map, globalStyles.flexBox]}>
                <BaseMap<Marker>
                    onMapPress={onMapPress}
                    markers={location ? [location] : undefined}
                />
            </View>
        </View>
    )
}

export default LocationSelection
