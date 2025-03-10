import { Route } from '@react-navigation/native'
import { View } from 'react-native'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Route as RouteEnum } from '~/shared/enums/Route'
import Header from '~/shared/views/Header'
import ProfileCard from '~/views/Profile/components/ProfileCard'
import ProfileHeader from '~/views/Profile/components/ProfileHeader'

type Props = {
    route: Route<RouteEnum>
}

const Profile = ({ route }: Props) => {
    return (
        <View style={globalStyles.flexBoxWithColor}>
            <Header route={route} />
            <ProfileHeader />
            <ProfileCard route={RouteEnum.ARCHIVE} />
        </View>
    )
}
export default Profile
