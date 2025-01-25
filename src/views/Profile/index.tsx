import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { globalStyles } from '~/shared/constants/globalStyles'

const Profile = () => {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Profil</Text>
        </View>
    )
}
export default Profile
