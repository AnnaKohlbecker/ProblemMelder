import { StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        elevation: 3000,
    },
    icon: {
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
    },
})

const LoadingSpinner = () => {
    return (
        <View style={[StyleSheet.absoluteFill, styles.container]}>
            <ActivityIndicator
                animating={true}
                size={RFValue(50)}
                style={styles.icon}
            />
        </View>
    )
}

export default LoadingSpinner
