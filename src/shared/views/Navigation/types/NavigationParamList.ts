import { Route } from '~/shared/enums/Route'

export type NavigationParamList = {
    [Route.MAIN]: undefined

    [Route.AUTHENTICATION]: undefined

    [Route.PROBLEM_REPORT]: undefined

    [Route.PROBLEMS]: undefined
    [Route.AUTHORITIES]: undefined
    [Route.MAP]: undefined

    [Route.PROFILE]: undefined
    [Route.MANAGEMENT]: undefined

    [Route.AUTHORITIES_MANAGEMENT]: undefined
    [Route.CATEGORIES_MANAGEMENT]: undefined
    [Route.EMPLOYEES_MANAGEMENT]: undefined
    [Route.ARCHIVE]: undefined
}
