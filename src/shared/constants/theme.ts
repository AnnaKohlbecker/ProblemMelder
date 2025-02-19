import { DefaultTheme } from 'react-native-paper'
import { colors } from '~/shared/constants/colors'

/**
 * Customized theme for react-native-paper
 */
export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.secondary,
        background: colors.white,
        surface: colors.secondary,
        surfaceVariant: colors.secondary,
        outline: colors.secondary,
        primaryContainer: colors.primary,
        onPrimaryContainer: colors.white,
        secondaryContainer: colors.secondary,
        inverseOnSurface: colors.white,
        error: colors.red,
    },
    roundness: 5,
}
