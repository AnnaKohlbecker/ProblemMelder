import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ParamListBase, RouteProp } from '@react-navigation/native'
import { useCallback } from 'react'
import { IconButton } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '~/shared/constants/colors'
import { RouteInformation } from '~/shared/constants/routeInformation'
import { useAuth } from '~/shared/context/AuthContext'
import { Role } from '~/shared/enums/Role'
import { Route } from '~/shared/enums/Route'
import { NavigationParamList } from '~/shared/views/Navigation/types/NavigationParamList'
import Authorities from '~/views/Authorities'
import Management from '~/views/Management/Overview'
import Map from '~/views/Map'
import Problems from '~/views/Problems'
import Profile from '~/views/Profile'

const TabNavigation = () => {
    const { hasRole } = useAuth()

    const Tab = createBottomTabNavigator<NavigationParamList>()

    const insets = useSafeAreaInsets()

    const screenOptions = useCallback(
        ({ route }: { route: RouteProp<ParamListBase, string> }): BottomTabNavigationOptions => ({
            tabBarIcon: ({ size, color, focused }) => (
                <IconButton
                    icon={
                        focused
                            ? RouteInformation[route.name as Route].focusedIcon
                            : RouteInformation[route.name as Route].unfocusedIcon
                    }
                    size={size}
                    iconColor={color}
                />
            ),
            tabBarHideOnKeyboard: true,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.secondary,
        }),
        [],
    )

    return (
        <Tab.Navigator
            safeAreaInsets={{ ...insets, bottom: insets.bottom + 5 }}
            initialRouteName={Route.MAP}
            screenOptions={screenOptions}
        >
            <Tab.Screen
                name={Route.MAP}
                component={Map}
                options={{
                    headerShown: false,
                    title: RouteInformation[Route.MAP].title,
                }}
            />
            <Tab.Screen
                name={Route.PROBLEMS}
                component={Problems}
                options={{
                    headerShown: false,
                    title: RouteInformation[Route.PROBLEMS].title,
                }}
            />
            <Tab.Screen
                name={Route.AUTHORITIES}
                component={Authorities}
                options={{
                    headerShown: false,
                    title: RouteInformation[Route.AUTHORITIES].title,
                }}
            />
            {hasRole(Role.Admin) ? (
                <Tab.Screen
                    name={Route.MANAGEMENT}
                    component={Management}
                    options={{
                        headerShown: false,
                        title: RouteInformation[Route.MANAGEMENT].title,
                    }}
                />
            ) : (
                <Tab.Screen
                    name={Route.PROFILE}
                    component={Profile}
                    options={{
                        headerShown: false,
                        title: RouteInformation[Route.PROFILE].title,
                    }}
                />
            )}
        </Tab.Navigator>
    )
}

export default TabNavigation
