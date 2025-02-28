import { ParamListBase, Route, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { isNil } from 'lodash'
import { useCallback, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Appbar } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { RouteInformation } from '~/shared/constants/routeInformation'
import { useAuth } from '~/shared/context/AuthContext'
import { useDialog } from '~/shared/context/DialogContext'
import { Route as RouteEnum } from '~/shared/enums/Route'

export const HeaderStyles = StyleSheet.create({
    title: {
        color: colors.primary,
        fontSize: RFValue(18),
    },
    wrapper: {
        backgroundColor: colors.white,
        color: colors.black,
    },
})

type Props = {
    route: Route<RouteEnum>
    onClose?: () => void
    seperator?: boolean
}

const Header = ({ route, seperator = true, onClose }: Props) => {
    const showDialog = useDialog()
    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const { session, signOut } = useAuth()

    const title = useMemo(() => RouteInformation[route.name].title, [route.name])

    const onLoginLogout = useCallback(() => {
        if (isNil(session)) {
            navigate(RouteEnum.AUTHENTICATION)
            return
        }

        showDialog({
            title: 'Abmelden?',
            description: '',
            onAccept: () => {
                signOut()
            },
        })
    }, [navigate, session, showDialog, signOut])

    return (
        <View>
            <Appbar.Header style={HeaderStyles.wrapper}>
                {onClose && (
                    <Appbar.BackAction
                        onPress={onClose}
                        color={colors.primary}
                    />
                )}
                <Appbar.Content
                    title={title}
                    titleStyle={HeaderStyles.title}
                />
                <Appbar.Action
                    icon={session ? 'logout' : 'login'}
                    onPress={onLoginLogout}
                    color={colors.primary}
                />
            </Appbar.Header>
            {seperator && <View style={globalStyles.separator} />}
        </View>
    )
}

export default Header
