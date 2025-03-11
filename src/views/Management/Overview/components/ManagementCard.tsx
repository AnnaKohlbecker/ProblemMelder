import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { isNil } from 'lodash'
import { useCallback, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Icon, Text, TouchableRipple } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
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
    content: {
        aspectRatio: 1,
        borderRadius: 10,
        height: RFValue(130),
        width: RFValue(130),
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

    if (isNil(routeInfo)) return <LoadingSpinner />

    return (
        <Card style={styles.card}>
            <TouchableRipple
                borderless={true}
                style={styles.content}
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
        </Card>
    )
}

export default ManagementCard
