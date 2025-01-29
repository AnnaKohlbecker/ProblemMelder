import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'

/**
 * Commonly used styles to be reused accorss the app to maintain consistency and avoid duplication.
 */
export const globalStyles = StyleSheet.create({
    appbar: {
        backgroundColor: colors.white,
    },
    card: {
        flex: 1,
        gap: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
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
    mb: {
        marginBottom: 10,
    },
    title: {
        fontSize: RFValue(20),
        textAlign: 'center',
    },
})
