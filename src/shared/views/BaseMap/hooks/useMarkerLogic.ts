import isNil from 'lodash/isNil'
import { useCallback, useState } from 'react'
import { Region } from 'react-native-maps'
import { MarkerBaseInfo } from '~/shared/types/MarkerBaseInfo'

type Props<T extends MarkerBaseInfo> = {
    markers: T[] | undefined
}

export const useMarkerLogic = <T extends MarkerBaseInfo = MarkerBaseInfo>({
    markers,
}: Props<T>) => {
    const [displayedMarkers, setDisplayedMarkers] = useState<T[]>([])

    const updateMarkers = useCallback(
        (region: Region) => {
            if (isNil(region) || isNil(markers)) return

            // Only display markers that are not already displayed
            const availableMarkers = markers.filter(
                (m) => !displayedMarkers.some((d) => d.id === m.id),
            )

            // Only display markers that are in the current region
            const filteredMarkers = availableMarkers.filter((marker) => {
                const { latitude, longitude } = marker

                return (
                    // We multiply the deltas by 1.5 to display markers that are slightly outside the region
                    latitude >= region.latitude - region.latitudeDelta * 1.5 &&
                    latitude <= region.latitude + region.latitudeDelta * 1.5 &&
                    longitude >= region.longitude - region.longitudeDelta * 1.5 &&
                    longitude <= region.longitude + region.longitudeDelta * 1.5
                )
            })

            if (filteredMarkers.length === 0) return

            setDisplayedMarkers([...displayedMarkers, ...filteredMarkers])
        },
        [displayedMarkers, markers],
    )

    return {
        displayedMarkers,
        updateMarkers,
    }
}
