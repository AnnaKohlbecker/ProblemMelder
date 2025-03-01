import { Route } from '~/shared/enums/Route'

export const RouteInformation = {
    [Route.MAIN]: {
        title: 'Hauptseite',
        focusedIcon: 'home',
        unfocusedIcon: 'home-outline',
    },

    [Route.AUTHENTICATION]: {
        title: 'Anmelden',
        focusedIcon: 'login',
        unfocusedIcon: 'login',
    },

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
    [Route.MANAGEMENT]: {
        title: 'Verwaltung',
        focusedIcon: 'cog',
        unfocusedIcon: 'cog-outline',
    },

    [Route.PROBLEM_REPORT]: {
        title: 'Problem melden',
        focusedIcon: 'alert-circle',
        unfocusedIcon: 'alert-circle-outline',
    },

    [Route.AUTHORITIES_MANAGEMENT]: {
        title: 'Behörden',
        focusedIcon: 'office-building-cog',
        unfocusedIcon: 'office-building-cog-outline',
    },
    [Route.CATEGORIES_MANAGEMENT]: {
        title: 'Kategorien',
        focusedIcon: 'book-cog',
        unfocusedIcon: 'book-cog-outline',
    },
    [Route.EMPLOYEES_MANAGEMENT]: {
        title: 'Mitarbeitende',
        focusedIcon: 'account-cog',
        unfocusedIcon: 'account-cog-outline',
    },
    [Route.ARCHIVE]: {
        title: 'Archiv',
        focusedIcon: 'archive',
        unfocusedIcon: 'archive-outline',
    },
}
