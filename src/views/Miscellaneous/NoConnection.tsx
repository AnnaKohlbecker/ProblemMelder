import { StyleSheet, View } from 'react-native'
import { Icon, Text } from 'react-native-paper'
import { globalStyles } from '~/shared/constants/globalStyles'

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        gap: 20,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
})

const NoConnection = () => {
    return (
        <View style={styles.container}>
            <Icon
                size={48}
                source='connection'
            />
            <Text style={globalStyles.titleFullWidth}>Keine Verbindung</Text>
            <Text style={globalStyles.subtitle}>
                Es konnte keine Verbindung zum Server hergestellt werden, bitte prüfe deine
                Netzwerkverbindung.
            </Text>
        </View>
    )
}

export default NoConnection
