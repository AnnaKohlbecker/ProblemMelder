import { isNil } from 'lodash'
import { useMemo } from 'react'
import { useLocation } from '~/shared/context/LocationContext'

/**
 * Calculate distance between two geo-points using Haversine formula
 */
const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const toRad = (value: number) => (value * Math.PI) / 180
    const R = 6371 // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c // in km
}

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

    /**
     * Check if a given point (lat/lon) is within the radius (in km) from the user location
     */
    const isInRadius = (targetLat: number, targetLon: number, radius: number): boolean => {
        if (isNil(userCoords)) return false // No user location
        const distance = haversineDistance(
            userCoords.latitude,
            userCoords.longitude,
            targetLat,
            targetLon,
        )
        return distance <= radius
    }

    return {
        isInRadius,
        userCoords,
    }
}
