export enum RouteKeys {
    MAP = 'map',
    PROBLEMS = 'problems',
    AUTHORITIES = 'authorities',
    PROFILE = 'profile',
}

export const ROUTES = [
    {
        key: RouteKeys.MAP,
        title: 'Karte',
        focusedIcon: 'map-marker',
        unfocusedIcon: 'map-marker-outline',
    },
    {
        key: RouteKeys.PROBLEMS,
        title: 'Probleme',
        focusedIcon: 'alert-circle',
        unfocusedIcon: 'alert-circle-outline',
    },
    {
        key: RouteKeys.AUTHORITIES,
        title: 'Behörden',
        focusedIcon: 'office-building',
        unfocusedIcon: 'office-building-outline',
    },
    {
        key: RouteKeys.PROFILE,
        title: 'Profil',
        focusedIcon: 'account',
        unfocusedIcon: 'account-outline',
    },
]
