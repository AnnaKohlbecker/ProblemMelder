import { LocationObject } from 'expo-location'
import { createContext, useContext } from 'react'

export type LocationInfo = LocationObject | undefined

export const LocationContext = createContext<LocationInfo>(undefined)

export const useLocation = () => useContext(LocationContext)
