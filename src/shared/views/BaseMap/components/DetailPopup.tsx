import { StyleSheet, View } from 'react-native'
import { Card, IconButton, Text } from 'react-native-paper'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Marker } from '~/shared/types/Marker'

type Props = {
    marker: Marker
    onClose: () => void
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        width: '90%',
    },
    closeButton: {
        position: 'absolute',
        right: -20,
        top: -20,
    },
    content: {
        paddingVertical: 10,
    },
    title: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    wrapper: {
        alignItems: 'center',
        backgroundColor: colors.backdrop,
        justifyContent: 'center',
    },
})

const DetailPopup = ({ marker, onClose }: Props) => {
    return (
        <View style={[globalStyles.flexBox, styles.wrapper]}>
            <Card style={[globalStyles.dialog, styles.card]}>
                <View style={styles.title}>
                    <Text variant='headlineSmall'>{marker.title}</Text>
                </View>
                <IconButton
                    icon='close'
                    onPress={onClose}
                    style={styles.closeButton}
                />
                <View style={styles.content}>
                    <Text>Hire kommt der Inhalt</Text>
                </View>
            </Card>
        </View>
    )
}

export default DetailPopup
