import { PropsWithChildren, useCallback } from 'react'
// eslint-disable-next-line no-restricted-imports
import { Alert, Linking, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    link: {
        textDecorationLine: 'underline',
    },
})

type Props = PropsWithChildren<{
    href: string
}>

/**
 * A custom Link component for React Native, as there is no native `<a>` tag in React Native.\
 * This component uses `TouchableOpacity` and `Text` from `react-native-paper` to create a link-like behavior.\
 * It attempts to open the provided URL using the `Linking` API and shows an alert if the URL cannot be opened.
 */
const Link = ({ href, children }: Props) => {
    const openLink = useCallback(async () => {
        const supported = await Linking.canOpenURL(href)

        if (!supported) {
            Alert.alert('Fehler', 'Ein unerwarteter Fehler ist aufgetreten.')
            return
        }

        await Linking.openURL(href)
    }, [href])

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={openLink}>
                <Text style={styles.link}>{children}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Link
