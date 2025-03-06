import { useCallback, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import { Button, Dialog, Portal } from 'react-native-paper'
import { useUpsertAuthorityMutation } from '~/queries/Authorities/useUpsertAuthorityMutation'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useSnackbar } from '~/shared/context/SnackbarContext'
import SwitchInput from '~/shared/views/Inputs/SwitchInput'
import TextInput from '~/shared/views/TextInput'
import { Authority } from '~/supabase/types'
import { AuthorityFormData } from '~/views/Management/Authorities/types/AuthorityFormData'

type Props = {
    editInfo: Authority | undefined
    onClose: () => void
}

const styles = StyleSheet.create({
    content: {
        gap: 10,
    },
})

const AddOrEditAuthorityModal = ({ editInfo, onClose }: Props) => {
    const showSnackbar = useSnackbar()

    const { mutate: upsertAuthority } = useUpsertAuthorityMutation()

    const form = useForm<AuthorityFormData>({
        defaultValues: {
            ...editInfo,
        },
    })
    const {
        handleSubmit,
        formState: { isDirty },
    } = form

    const onSubmit = useCallback(
        (data: AuthorityFormData) => {
            upsertAuthority(
                { ...data, id: editInfo?.id },
                {
                    onSuccess: () => {
                        onClose()
                        showSnackbar('Die Behörde wurde erfolgreich gespeichert.')
                    },
                },
            )
        },
        [editInfo?.id, onClose, showSnackbar, upsertAuthority],
    )

    const title = useMemo(
        () => (editInfo ? 'Behörde bearbeiten' : 'Behörde hinzufügen'),
        [editInfo],
    )

    return (
        <Portal>
            <Dialog
                visible={true}
                onDismiss={onClose}
                style={globalStyles.dialog}
            >
                <FormProvider {...form}>
                    <Dialog.Title>{title}</Dialog.Title>
                    <Dialog.Content style={styles.content}>
                        <TextInput
                            name='name'
                            label='Name der Behörde'
                            rules={{
                                required: 'Bitte gebe einen Namen ein.',
                            }}
                        />
                        <TextInput
                            name='domain'
                            label='Zuhehörige Domain'
                            helperText='Die Domain, die für diese Behörde verwendet wird.'
                            rules={{
                                required: 'Bitte gebe eine Domain ein.',
                                validate: (value) => {
                                    if (value.includes('@'))
                                        return 'Bitte gebe nur die Domain, ohne das @-Zeichen, ein.'

                                    return true
                                },
                            }}
                        />
                        <SwitchInput
                            name='allowSignup'
                            label='Registrierung erlauben'
                            helperText='Wenn aktiviert, können sich Mitarbeitende der Behörde selbst als Verwalter registrieren.'
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={onClose}>Abbrechen</Button>
                        <Button
                            disabled={!isDirty}
                            onPress={handleSubmit(onSubmit)}
                        >
                            Speichern
                        </Button>
                    </Dialog.Actions>
                </FormProvider>
            </Dialog>
        </Portal>
    )
}

export default AddOrEditAuthorityModal
