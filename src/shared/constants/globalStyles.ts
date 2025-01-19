import { StyleSheet } from 'react-native'
import { colors } from '~/shared/constants/colors'

/**
 * Commonly used styles to be reused accorss the app to maintain consistency and avoid duplication.
 */
export const globalStyles = StyleSheet.create({
    dialog: {
        backgroundColor: colors.white,
    },
    flexBox: {
        flex: 1,
    },
})
