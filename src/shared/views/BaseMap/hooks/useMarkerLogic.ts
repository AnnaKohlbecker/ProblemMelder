import isNil from 'lodash/isNil'
import { useCallback, useEffect, useState } from 'react'
import { Region } from 'react-native-maps'
import { MarkerBaseInfo } from '~/shared/types/MarkerBaseInfo'

type Props<T extends MarkerBaseInfo> = {
    markers: T[] | undefined
}

export const useMarkerLogic = <T extends MarkerBaseInfo = MarkerBaseInfo>({
    markers,
}: Props<T>) => {
    const [displayedMarkers, setDisplayedMarkers] = useState<T[]>([])
    const [currentRegion, setCurrentRegion] = useState<Region | null>(null)

    const updateMarkers = useCallback(
        (region: Region) => {
            if (isNil(region) || isNil(markers)) return

            setCurrentRegion(region)

            const filteredMarkers = markers.filter(
                ({ latitude, longitude }) =>
                    latitude >= region.latitude - region.latitudeDelta * 1.5 &&
                    latitude <= region.latitude + region.latitudeDelta * 1.5 &&
                    longitude >= region.longitude - region.longitudeDelta * 1.5 &&
                    longitude <= region.longitude + region.longitudeDelta * 1.5,
            )

            setDisplayedMarkers(filteredMarkers)
        },
        [markers],
    )

    useEffect(() => {
        if (!currentRegion || !markers) return

        updateMarkers(currentRegion)
    }, [markers, currentRegion, updateMarkers])

    return {
        displayedMarkers,
        updateMarkers,
    }
}
