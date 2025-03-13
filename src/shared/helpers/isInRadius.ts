import { isNil } from 'lodash'
import { getHaversineDistance } from '~/shared/helpers/getHaversineDistance'

/**
 * Check if a given point (lat/lon) is within the radius (in km) from the user location
 */
export const isInRadius = (
    targetLat: number,
    targetLon: number,
    radius: number,
    userCoords: { latitude: number; longitude: number } | undefined,
): boolean => {
    if (isNil(userCoords)) return false // No user location
    const distance = getHaversineDistance(
        userCoords.latitude,
        userCoords.longitude,
        targetLat,
        targetLon,
    )
    return distance <= radius
}
