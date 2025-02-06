import { ParamListBase, Route, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useCallback } from 'react'
import { View } from 'react-native'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Route as RouteEnum } from '~/shared/enums/Route'
import Header from '~/shared/views/Header'

type Props = {
    route: Route<RouteEnum>
}

const Archive = ({ route }: Props) => {
    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()

    const onClose = useCallback(() => {
        navigate(RouteEnum.MANAGEMENT)
    }, [navigate])

    return (
        <View style={globalStyles.flexBox}>
            <Header
                route={route}
                onClose={onClose}
            />
        </View>
    )
}

export default Archive
