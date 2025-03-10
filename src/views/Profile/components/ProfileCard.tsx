import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { isNil } from 'lodash'
import { useCallback, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Icon, Text, TouchableRipple } from 'react-native-paper'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { RouteInformation } from '~/shared/constants/routeInformation'
import { Route } from '~/shared/enums/Route'
import LoadingSpinner from '~/shared/views/LoadingSpinner'

type Props = {
    route: Route
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 10,
    },
    wrapper: {
        alignItems: 'center',
        gap: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 20,
    },
    view: {
        padding: 20,
    },
    ripple: {
        borderRadius: 10,
    },
})

const ProfileCard = ({ route }: Props) => {
    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()

    const routeInfo = useMemo(() => RouteInformation[route], [route])

    const onPress = useCallback(() => {
        navigate(route)
    }, [navigate, route])

    return (
        <View style={styles.view}>
            <Card style={styles.card}>
                {isNil(routeInfo) ? (
                    <View style={styles.wrapper}>
                        <LoadingSpinner />
                    </View>
                ) : (
                    <TouchableRipple
                        borderless={true}
                        style={styles.ripple}
                        onPress={onPress}
                    >
                        <View style={styles.wrapper}>
                            <Icon
                                color={colors.primary}
                                source={routeInfo.focusedIcon}
                                size={50}
                            />
                            <Text style={globalStyles.subtitle}>{routeInfo.title}</Text>
                        </View>
                    </TouchableRipple>
                )}
            </Card>
        </View>
    )
}

export default ProfileCard
