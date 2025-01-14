import { StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
})

type Props = {
    size?: 'small' | 'large' | number
}

const LoadingSpinner = ({ size = 'large' }: Props) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator
                animating
                size={size}
            />
        </View>
    )
}

export default LoadingSpinner
