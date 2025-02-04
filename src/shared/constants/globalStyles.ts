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
        backgroundColor: colors.white,
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
    },
    cardsView: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    centerContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    column: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
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
    flatList: {
        paddingHorizontal: 20,
    },
    flatListFooterComponent: {
        padding: 35,
    },
    flexBox: {
        flex: 1,
    },
    header: {
        backgroundColor: colors.white,
        color: colors.black,
    },
    headerRow: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerRowLeft: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerRowRight: {
        alignItems: 'center',
    },
    iconGroup: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 20,
    },
    infoRow: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
        marginVertical: 2,
    },
    mb: {
        marginBottom: 10,
    },
    noDataText: {
        color: colors.gray,
        fontSize: RFValue(16),
        textAlign: 'center',
    },
    searchAndFilterContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
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
