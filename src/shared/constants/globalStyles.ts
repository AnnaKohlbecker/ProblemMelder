import { StyleSheet } from 'react-native'
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
})
