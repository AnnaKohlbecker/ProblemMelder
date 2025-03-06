import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'
import { isNil } from 'lodash'
import { useEffect, useRef } from 'react'
import StackNavigation from '~/shared/views/Navigation/components/StackNavigation'

const Navigation = () => {
    const queryClient = useQueryClient()

    const navigationRef = useNavigationContainerRef()
    const prevRouteName = useRef<string | null>(null)
    const isFirstLoad = useRef(true)

    useEffect(() => {
        const unsubscribe = navigationRef.addListener('state', () => {
            const currentRoute = navigationRef.getCurrentRoute()
            if (isNil(currentRoute)) return

            // Prevent infinite loop: Ignore first load
            if (isFirstLoad.current) {
                isFirstLoad.current = false
                return
            }

            // Only invalidate queries when switching screens/tabs
            if (prevRouteName.current !== currentRoute.name) {
                queryClient.invalidateQueries()
            }

            prevRouteName.current = currentRoute.name
        })

        return () => {
            unsubscribe()
        }
    }, [navigationRef, queryClient])

    return (
        <NavigationContainer ref={navigationRef}>
            <StackNavigation />
        </NavigationContainer>
    )
}

export default Navigation
