import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, ParamListBase, RouteProp } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import Login from '~/views/Authentication/components/Login'
import Register from '~/views/Authentication/components/Register'

const Authentication = () => {
    const queryClient = useQueryClient()
    const Tab = createBottomTabNavigator()

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

    return (
        <View style={globalStyles.flexBox}>
            <NavigationContainer>
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
