import { Route } from '~/shared/enums/Route'

export const RouteInformation = {
    [Route.MAP]: {
        title: 'Karte',
        focusedIcon: 'map-marker',
        unfocusedIcon: 'map-marker-outline',
    },
    [Route.PROBLEMS]: {
        title: 'Probleme',
        focusedIcon: 'alert-circle',
        unfocusedIcon: 'alert-circle-outline',
    },
    [Route.AUTHORITIES]: {
        title: 'Behörden',
        focusedIcon: 'office-building',
        unfocusedIcon: 'office-building-outline',
    },
    [Route.PROFILE]: {
        title: 'Profil',
        focusedIcon: 'account',
        unfocusedIcon: 'account-outline',
    },
    [Route.PROBLEM_REPORT]: {
        title: 'Problem melden',
        focusedIcon: 'alert-circle',
        unfocusedIcon: 'alert-circle-outline',
    },
    [Route.MAIN]: {
        title: 'Hauptseite',
        focusedIcon: 'home',
        unfocusedIcon: 'home-outline',
    },
}
