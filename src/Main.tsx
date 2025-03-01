import NetInfo from '@react-native-community/netinfo'
import { useEffect, useState } from 'react'
import { useAuth } from '~/shared/context/AuthContext'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import Navigation from '~/shared/views/Navigation'
import NoConnection from '~/views/Miscellaneous/NoConnection'

const Main = () => {
    const { isLoading } = useAuth()

    const [isConnected, setIsConnected] = useState(true)

    useEffect(() => {
        /**
         * Check whether or not the user has an internet connection.
         *
         * If the user is not connected to the internet, the NoConnection component will be displayed.
         */
        const unsubscribe = NetInfo.addEventListener((state) => {
            if (state.isInternetReachable === null) return

            setIsConnected(state.isInternetReachable)
        })

        return () => unsubscribe()
    }, [])

    if (!isConnected) return <NoConnection />

    if (isLoading) return <LoadingSpinner />

    return <Navigation />
}

export default Main
