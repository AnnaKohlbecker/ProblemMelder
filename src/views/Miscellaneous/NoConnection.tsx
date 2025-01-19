import { StyleSheet, View } from 'react-native'
import { Icon, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        gap: 20,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    subtitle: {
        fontSize: RFValue(14),
        textAlign: 'center',
    },
    title: {
        fontSize: RFValue(20),
        textAlign: 'center',
    },
})

const NoConnection = () => {
    return (
        <View style={styles.container}>
            <Icon
                size={48}
                source='connection'
            />
            <Text style={styles.title}>Keine Verbindung</Text>
            <Text style={styles.subtitle}>
                Es konnte keine Verbindung zum Server hergestellt werden, bitte prüfe deine
                Netzwerkverbindung.
            </Text>
        </View>
    )
}

export default NoConnection
