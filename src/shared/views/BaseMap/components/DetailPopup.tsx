import { StyleSheet, View } from 'react-native'
import { Button, Dialog, Text } from 'react-native-paper'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Marker } from '~/shared/types/Marker'

type Props = {
    marker: Marker
    onClose: () => void
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})

const DetailPopup = ({ marker, onClose }: Props) => {
    return (
        <View style={[globalStyles.flexBox, styles.wrapper]}>
            <Dialog
                visible={true}
                dismissable={true}
                onDismiss={onClose}
                style={globalStyles.dialog}
            >
                <Dialog.Title>{marker.title}</Dialog.Title>
                <Dialog.Content>
                    <Text>Hier kommt der Inhalt</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onClose}>Ok</Button>
                </Dialog.Actions>
            </Dialog>
        </View>
    )
}

export default DetailPopup
