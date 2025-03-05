import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { isNil } from 'lodash'
import { useCallback, useMemo } from 'react'

import { StyleSheet, View } from 'react-native'
import { Card, Icon, Text, TouchableRipple } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'
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
    content: {
        aspectRatio: 1,
        borderRadius: 10,
        height: RFValue(100),
        width: RFValue(100),
    },
    subtitle: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    wrapper: {
        alignItems: 'center',
        flex: 1,
        gap: 5,
        justifyContent: 'center',
    },
})

const ManagementCard = ({ route }: Props) => {
    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()

    const routeInfo = useMemo(() => RouteInformation[route], [route])

    const onPress = useCallback(() => {
        navigate(route)
    }, [navigate, route])

    return (
        <Card style={styles.card}>
            {isNil(routeInfo) ? (
                <View style={styles.wrapper}>
                    <LoadingSpinner />
                </View>
            ) : (
                <TouchableRipple
                    borderless={true}
                    style={styles.content}
                    onPress={onPress}
                >
                    <View style={styles.wrapper}>
                        <Icon
                            color={colors.primary}
                            source={routeInfo.focusedIcon}
                            size={45}
                        />
                        <Text style={styles.subtitle}>{routeInfo.title}</Text>
                    </View>
                </TouchableRipple>
            )}
        </Card>
    )
}

export default ManagementCard
