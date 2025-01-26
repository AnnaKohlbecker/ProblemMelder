import { useState } from 'react'
import { BottomNavigation } from 'react-native-paper'
import { RouteKeys, ROUTES } from '~/shared/constants/routes'
import Authorities from '~/views/Authorities'
import Map from '~/views/Map'
import Problems from '~/views/Problems'
import Profile from '~/views/Profile'

const Navigation = () => {
    const [index, setIndex] = useState(0)

    const renderScene = BottomNavigation.SceneMap({
        [RouteKeys.MAP]: Map,
        [RouteKeys.PROBLEMS]: Problems,
        [RouteKeys.AUTHORITIES]: Authorities,
        [RouteKeys.PROFILE]: Profile,
    })

    return (
        <BottomNavigation
            navigationState={{ index, routes: ROUTES }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    )
}
export default Navigation
