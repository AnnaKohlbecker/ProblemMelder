import { Route } from '@react-navigation/native'
import { StyleSheet, View } from 'react-native'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Route as RouteEnum } from '~/shared/enums/Route'
import Header from '~/shared/views/Header'
import ManagementCard from '~/views/Management/Overview/components/ManagementCard'
import ProfileHeader from '~/views/Profile/components/ProfileHeader'

type Props = {
    route: Route<RouteEnum>
}

const styles = StyleSheet.create({
    grid: {
        alignItems: 'center',
        flex: 2,
        gap: 20,
    },
    row: {
        flexDirection: 'row',
        gap: 20,
    },
})

const Management = ({ route }: Props) => {
    return (
        <View style={globalStyles.flexBox}>
            <Header route={route} />
            <ProfileHeader />
            <View style={globalStyles.flexBox}>
                <View style={styles.grid}>
                    <View style={styles.row}>
                        <ManagementCard route={RouteEnum.AUTHORITIES_MANAGEMENT} />
                        <ManagementCard route={RouteEnum.CATEGORIES_MANAGEMENT} />
                    </View>
                    <View style={styles.row}>
                        <ManagementCard route={RouteEnum.EMPLOYEES_MANAGEMENT} />
                        <ManagementCard route={RouteEnum.ARCHIVE} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Management
