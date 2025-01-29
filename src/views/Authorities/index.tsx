import { View } from 'react-native'
import { BaseRoute } from 'react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation'
import Header from '~/shared/components/Header'
import { globalStyles } from '~/shared/constants/globalStyles'

type Props = {
    route: BaseRoute
}

const Authorities = ({ route }: Props) => {
    return (
        <View style={globalStyles.flexBox}>
            <Header route={route} />
        </View>
    )
}
export default Authorities
