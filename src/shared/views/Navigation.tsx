import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
    },
})

const Navigation = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Get started by editing ~/shared/views/Navigation.tsx</Text>
        </View>
    )
}
export default Navigation
