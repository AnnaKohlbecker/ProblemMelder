import React from 'react'
import { BottomNavigation, Text } from 'react-native-paper'

const MapRoute = () => <Text>Map</Text>

const ProblemsRoute = () => <Text>Problems</Text>

const AuthoritiesRoute = () => <Text>Authorities</Text>

const ProfileRoute = () => <Text>Profile</Text>

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
        map: MapRoute,
        problems: ProblemsRoute,
        authorities: AuthoritiesRoute,
        profile: ProfileRoute,
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
