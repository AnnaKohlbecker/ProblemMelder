import { useCallback, useMemo } from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import HeaderImage from '~/../assets/header.png'
import SelectButton from '~/shared/components/SelectButton'
import { colors } from '~/shared/constants/colors'
import { useAuth } from '~/shared/context/AuthContext'

const styles = StyleSheet.create({
    element: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 20,
    },
    headerImage: {
        height: 130,
    },
    headerText: {
        color: colors.white,
        fontSize: RFValue(24),
        fontWeight: 'bold',
        height: 60,
        textAlignVertical: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: `${colors.black}50`,
    },
})

const Header = () => {
    const { signOut } = useAuth()

    const options = useMemo(
        () => [
            {
                label: 'Abmelden',
                iconSource: 'logout',
            },
        ],
        [],
    )

    const onOptionChange = useCallback(
        (selectedOption: string) => {
            if (selectedOption === 'Abmelden') signOut()
        },
        [signOut],
    )

    return (
        <View>
            <ImageBackground
                style={styles.headerImage}
                source={HeaderImage}
                resizeMode='cover'
            >
                <View style={styles.overlay} />
                <View style={styles.element}>
                    <Text style={styles.headerText}>Header</Text>

                    <SelectButton
                        icon='account'
                        options={options}
                        onChange={onOptionChange}
                    ></SelectButton>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Header
