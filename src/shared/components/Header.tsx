import { useCallback, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Appbar } from 'react-native-paper'
import { BaseRoute } from 'react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation'
import { RFValue } from 'react-native-responsive-fontsize'
import LogoutDialog from '~/shared/components/LogoutDialog'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'

export const styles = StyleSheet.create({
    title: {
        color: colors.primary,
        fontSize: RFValue(20),
    },
})

type Props = {
    route: BaseRoute
}

const Header = ({ route }: Props) => {
    const [logoutVisible, setLogoutVisible] = useState(false)

    const onLogout = useCallback(() => {
        setLogoutVisible(true) // Show the logout dialog
    }, [])

    return (
        <View>
            <Appbar.Header style={globalStyles.header}>
                <Appbar.Content
                    title={useMemo(() => route.title ?? '', [route.title])}
                    titleStyle={styles.title}
                />
                <Appbar.Action
                    icon='logout'
                    onPress={onLogout}
                    color={colors.primary}
                />
            </Appbar.Header>
            <View style={globalStyles.separator} />

            {/* Full-screen logout dialog */}
            <LogoutDialog
                visible={logoutVisible}
                onDismiss={() => setLogoutVisible(false)}
            />
        </View>
    )
}

export default Header
