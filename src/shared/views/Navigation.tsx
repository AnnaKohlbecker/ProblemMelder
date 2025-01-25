import React from 'react'
import { BottomNavigation } from 'react-native-paper'
import Authorities from '~/views/Authorities'
import Map from '~/views/Map'
import Problems from '~/views/Problems'
import Profile from '~/views/Profile'

const Navigation = () => {
    const [index, setIndex] = React.useState(0)
    const [routes] = React.useState([
        {
            key: 'map',
            title: 'Karte',
            focusedIcon: 'map-marker',
            unfocusedIcon: 'map-marker-outline',
        },
        {
            key: 'problems',
            title: 'Probleme',
            focusedIcon: 'alert-circle',
            unfocusedIcon: 'alert-circle-outline',
        },
        {
            key: 'authorities',
            title: 'Behörden',
            focusedIcon: 'office-building',
            unfocusedIcon: 'office-building-outline',
        },
        {
            key: 'profile',
            title: 'Profil',
            focusedIcon: 'account',
            unfocusedIcon: 'account-outline',
        },
    ])

    const renderScene = BottomNavigation.SceneMap({
        map: Map,
        problems: Problems,
        authorities: Authorities,
        profile: Profile,
    })

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    )
}
export default Navigation
