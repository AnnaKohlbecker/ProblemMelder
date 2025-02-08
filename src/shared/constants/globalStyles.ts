import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'

/**
 * Commonly used styles to be reused accorss the app to maintain consistency and avoid duplication.
 */
export const globalStyles = StyleSheet.create({
    bgWhite: {
        backgroundColor: colors.white,
    },
    bold: {
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: 10,
        marginVertical: 10,
        padding: 5,
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
    flexCenter: {
        flex: 1,
        justifyContent: 'center',
    },
    flexRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    flexRowWithSpace: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mb: {
        marginBottom: 10,
    },
    noDataText: {
        color: colors.darkGray,
        fontSize: RFValue(16),
        textAlign: 'center',
    },
    searchBar: {
        backgroundColor: colors.gray,
        color: colors.black,
        flex: 1,
    },
    separator: {
        backgroundColor: colors.gray,
        height: 1,
        width: '100%',
    },
    title: {
        color: colors.black,
        fontSize: RFValue(16),
        fontWeight: 'bold',
    },
})
