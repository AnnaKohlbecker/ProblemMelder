import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
    NavigationContainer,
    ParamListBase,
    RouteProp,
    useNavigation,
} from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { View } from 'react-native'
import { Appbar, IconButton } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Route } from '~/shared/enums/Route'
import { HeaderStyles } from '~/shared/views/Header'
import Login from '~/views/Authentication/components/Login'
import Register from '~/views/Authentication/components/Register'

const Authentication = () => {
    const queryClient = useQueryClient()
    const Tab = createBottomTabNavigator()

    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()

    const onFocus = useCallback(() => {
        queryClient.invalidateQueries()
    }, [queryClient])

    const insets = useSafeAreaInsets()

    const screenOptions = useCallback(
        ({ route }: { route: RouteProp<ParamListBase, string> }): BottomTabNavigationOptions => ({
            tabBarIcon: ({ size, color }) => (
                <IconButton
                    icon={route.name === 'Anmelden' ? 'login' : 'account-plus'}
                    size={size}
                    iconColor={color}
                />
            ),
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.secondary,
        }),
        [],
    )

    const onClose = useCallback(() => {
        navigate(Route.MAP)
    }, [navigate])

    return (
        <View style={globalStyles.flexBox}>
            <View>
                <Appbar.Header style={HeaderStyles.wrapper}>
                    <Appbar.BackAction
                        onPress={onClose}
                        color={colors.primary}
                    />
                </Appbar.Header>
                <View style={globalStyles.separator} />
            </View>
            <NavigationContainer independent={true}>
                <Tab.Navigator
                    initialRouteName='Anmelden'
                    safeAreaInsets={{ ...insets, bottom: insets.bottom + 5 }}
                    screenOptions={screenOptions}
                    screenListeners={{
                        focus: onFocus,
                    }}
                >
                    <Tab.Screen
                        name='Anmelden'
                        component={Login}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Tab.Screen
                        name='Registrieren'
                        component={Register}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </View>
    )
}

export default Authentication
