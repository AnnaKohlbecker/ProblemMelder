import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { StyleSheet } from 'react-native'
import { BottomNavigation } from 'react-native-paper'
import { colors } from '~/shared/constants/colors'
import { RouteKeys, ROUTES } from '~/shared/constants/routes'
import Authorities from '~/views/Authorities'
import Map from '~/views/Map'
import Problems from '~/views/Problems'
import Profile from '~/views/Profile'

const styles = StyleSheet.create({
    barStyle: {
        backgroundColor: colors.white,
        borderColor: colors.gray,
        borderTopWidth: 1,
    },
})

const Navigation = () => {
    const queryClient = useQueryClient()
    const [index, setIndex] = useState(0)

    const renderScene = useCallback(() => {
        queryClient.invalidateQueries()

        return BottomNavigation.SceneMap({
            [RouteKeys.MAP]: Map,
            [RouteKeys.PROBLEMS]: Problems,
            [RouteKeys.AUTHORITIES]: Authorities,
            [RouteKeys.PROFILE]: Profile,
        })
    }, [queryClient])

    return (
        <BottomNavigation
            navigationState={{ index, routes: ROUTES }}
            onIndexChange={setIndex}
            renderScene={renderScene()}
            activeColor={colors.primary}
            inactiveColor={colors.primary}
            theme={{ colors: { secondaryContainer: colors.secondary } }}
            barStyle={styles.barStyle}
        />
    )
}

export default Navigation
