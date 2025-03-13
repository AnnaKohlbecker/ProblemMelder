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
    button: {
        backgroundColor: colors.secondary,
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
    error: {
        alignSelf: 'center',
        color: colors.red,
    },
    fab: {
        bottom: 0,
        margin: 16,
        position: 'absolute',
        right: 0,
        borderRadius: 100,
    },
    flexBox: {
        flex: 1,
    },
    flexBoxWithColor: {
        backgroundColor: colors.tertiary,
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
    flexRowCenter: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    flexRowWithGap: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
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
        color: colors.secondary,
        fontSize: RFValue(16),
        textAlign: 'center',
    },
    searchBar: {
        backgroundColor: colors.white,
        flex: 1,
        height: RFValue(45),
    },
    title: {
        fontSize: RFValue(16),
        fontWeight: 'bold',
        width: '80%',
    },
    titleFullWidth: {
        fontSize: RFValue(16),
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: RFValue(14),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    divider: {
        borderWidth: 0.2,
        borderColor: colors.secondary,
    },
    gap: {
        gap: 15,
    },
    contentWrapper: {
        height: 600,
        backgroundColor: colors.tertiary,
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10,
    },
    contentWrapperWithKeyboard: {
        height: 300,
        backgroundColor: colors.tertiary,
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10,
    },
    cardSubtitle: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 10,
    },
    cardView: {
        padding: 15,
        backgroundColor: colors.white,
        width: '90%',
        maxHeight: '90%',
    },
    dialogWrapper: {
        alignItems: 'center',
        backgroundColor: colors.backdrop,
        elevation: 1000,
        justifyContent: 'center',
    },
    cardHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },
    cardHeaderButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: 110,
    },
    cardHeaderTitle: {
        fontSize: RFValue(14),
        fontWeight: 'bold',
        width: '50%',
    },
    dialogCard: {
        padding: 15,
        backgroundColor: colors.white,
        width: '90%',
        maxHeight: '90%',
    },
    filterButton: {
        backgroundColor: colors.primary,
        height: RFValue(45),
        width: RFValue(45),
        borderRadius: 100,
    },
})
