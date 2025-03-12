import { isNil } from 'lodash'
import { useMemo } from 'react'
import { useLocation } from '~/shared/context/LocationContext'
import { isInRadius } from '~/shared/helpers/isInRadius'

/**
 * Hook to check if a location is within a certain radius from user's location
 */
export const useInRadiusLogic = () => {
    const location = useLocation()

    const userCoords = useMemo(() => {
        if (isNil(location)) return undefined
        const { latitude, longitude } = location.coords
        return { latitude, longitude }
    }, [location])

    return {
        isInRadius: (targetLat: number, targetLon: number, radius: number) =>
            isInRadius(targetLat, targetLon, radius, userCoords),
        userCoords,
    }
}
