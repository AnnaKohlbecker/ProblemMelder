import { PropsWithChildren, useCallback, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Dialog, Portal, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { globalStyles } from '~/shared/constants/globalStyles'
import { DialogContext, DialogInfo } from '~/shared/context/DialogContext'

const styles = StyleSheet.create({
    content: { gap: 10 },
    description: {
        fontSize: RFValue(13),
    },
})

type Props = PropsWithChildren

/**
 * Provides a simple hook to show a dialog with a title and description without the need to pass the dialog info through props.
 */
const DialogProvider = ({ children }: Props) => {
    const [dialogInfo, setDialogInfo] = useState<DialogInfo>()

    const onDismiss = useCallback(() => {
        dialogInfo?.onDismiss?.()
        setDialogInfo(undefined)
    }, [dialogInfo])

    const onAccept = useCallback(() => {
        dialogInfo?.onAccept()
        setDialogInfo(undefined)
    }, [dialogInfo])

    return (
        <DialogContext.Provider value={{ setDialogInfo }}>
            {children}
            <Portal>
                {dialogInfo && (
                    <Dialog
                        visible
                        dismissable={false}
                        style={globalStyles.dialog}
                    >
                        <Dialog.Title>{dialogInfo.title}</Dialog.Title>
                        <Dialog.Content style={styles.content}>
                            <Text style={styles.description}>{dialogInfo.description}</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={onDismiss}>Abbrechen</Button>
                            <Button onPress={onAccept}>Fortfahren</Button>
                        </Dialog.Actions>
                    </Dialog>
                )}
            </Portal>
        </DialogContext.Provider>
    )
}

export default DialogProvider
