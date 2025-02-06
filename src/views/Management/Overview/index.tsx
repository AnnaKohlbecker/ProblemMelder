import { Route } from '@react-navigation/native'
// eslint-disable-next-line no-restricted-imports
import { StyleSheet, View } from 'react-native'
import { Card, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { useUserByIdQuery } from '~/queries/UserData/useUserByIdQuery'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'
import { Route as RouteEnum } from '~/shared/enums/Route'
import Header from '~/shared/views/Header'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import ManagementCard from '~/views/Management/Overview/components/ManagementCard'

type Props = {
    route: Route<RouteEnum>
}

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
        padding: 20,
        width: RFValue(220),
    },
    grid: {
        alignItems: 'center',
        flex: 2,
        gap: 20,
    },
    row: {
        flexDirection: 'row',
        gap: 20,
    },
    wrapper: {
        paddingHorizontal: 65,
        paddingVertical: 40,
    },
})

const Management = ({ route }: Props) => {
    const { session } = useAuth()

    const { data: user, isLoading: userLoading } = useUserByIdQuery({ userId: session?.user.id })

    return (
        <View style={globalStyles.flexBox}>
            <Header route={route} />
            <View style={[globalStyles.flexBox, styles.wrapper]}>
                <Card style={[globalStyles.card, styles.card]}>
                    <Text variant='titleMedium'>
                        Deine Punkte:{' '}
                        {userLoading ? (
                            <LoadingSpinner size={12} />
                        ) : (
                            <Text variant='bodyLarge'>{user?.points}</Text>
                        )}
                    </Text>
                </Card>

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
