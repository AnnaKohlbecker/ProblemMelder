import { useCallback, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Appbar } from 'react-native-paper'
import { BaseRoute } from 'react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'

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
    const { signOut } = useAuth()

    const onLogout = useCallback(() => signOut(), [signOut])

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
        </View>
    )
}

export default Header
