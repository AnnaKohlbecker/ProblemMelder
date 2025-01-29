import { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Dialog, Portal } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'

export const styles = StyleSheet.create({
    buttonLabel: {
        fontSize: RFValue(15),
    },
    dialogActions: {
        justifyContent: 'space-around',
    },
})

type LogoutDialogProps = {
    visible: boolean
    onDismiss: () => void
}

const LogoutDialog = ({ visible, onDismiss }: LogoutDialogProps) => {
    const { signOut } = useAuth()

    const onConfirm = useCallback(() => {
        onDismiss()
        signOut()
    }, [signOut, onDismiss])

    return (
        <Portal>
            <Dialog
                visible={visible}
                style={globalStyles.dialog}
                onDismiss={onDismiss}
            >
                <Dialog.Title>Abmelden?</Dialog.Title>
                <Dialog.Actions style={styles.dialogActions}>
                    <Button
                        onPress={onDismiss}
                        labelStyle={styles.buttonLabel}
                    >
                        Nein
                    </Button>
                    <Button
                        onPress={onConfirm}
                        labelStyle={styles.buttonLabel}
                    >
                        Ja
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

export default LogoutDialog
