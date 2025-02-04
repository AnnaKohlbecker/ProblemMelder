import { Route } from '@react-navigation/native'
import { View } from 'react-native'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Route as RouteEnum } from '~/shared/enums/Route'
import Header from '~/shared/views/Header'

type Props = {
    route: Route<RouteEnum>
}

const Problems = ({ route }: Props) => {
    return (
        <View style={globalStyles.flexBox}>
            <Header route={route} />
        </View>
    )
}
export default Problems
