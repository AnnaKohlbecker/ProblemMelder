import { StyleSheet, View } from 'react-native'
import { Appbar } from 'react-native-paper'
import { BaseRoute } from 'react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'
import { useAuth } from '~/shared/context/AuthContext'

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.white,
    },
    separator: {
        backgroundColor: colors.gray,
        height: 1,
        width: '100%',
    },
    title: {
        color: colors.primary,
        fontSize: RFValue(20),
    },
})

type Props = {
    route: BaseRoute
}

const Header = ({ route }: Props) => {
    const { signOut } = useAuth()

    const _handleLogout = () => signOut()

    return (
        <View>
            <Appbar.Header style={styles.header}>
                <Appbar.Content
                    title={route.title || ''}
                    titleStyle={styles.title}
                />
                <Appbar.Action
                    icon='logout'
                    onPress={_handleLogout}
                    color={colors.primary}
                />
            </Appbar.Header>
            <View style={styles.separator} />
        </View>
    )
}

export default Header
