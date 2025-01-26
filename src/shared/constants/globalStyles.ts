import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'

/**
 * Commonly used styles to be reused accorss the app to maintain consistency and avoid duplication.
 */
export const globalStyles = StyleSheet.create({
    appbar: {
        backgroundColor: colors.white,
        borderTopColor: colors.secondary,
        borderTopWidth: 1,
    },
    container: {
        alignItems: 'center',
        flex: 1,
        gap: 20,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    dialog: {
        backgroundColor: colors.white,
    },
    fab: {
        bottom: 0,
        margin: 16,
        position: 'absolute',
        right: 0,
    },
    flexBox: {
        flex: 1,
    },
    title: {
        fontSize: RFValue(20),
        textAlign: 'center',
    },
})
