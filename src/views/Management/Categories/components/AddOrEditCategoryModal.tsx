import { useCallback, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import { Button, Dialog, Portal } from 'react-native-paper'
import { useUpsertProblemCategoryMutation } from '~/queries/ProblemCategories/useUpsertProblemCategoryMutation'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useSnackbar } from '~/shared/context/SnackbarContext'
import { ProblemCategory } from '~/shared/models/ProblemCategory'
import IconPicker from '~/shared/views/Inputs/IconPicker'
import TextInput from '~/shared/views/TextInput'
import { ProblemCategoryFormData } from '~/views/Management/Categories/types/ProblemCategoryFormData'

type Props = {
    editInfo: ProblemCategory | undefined
    onClose: () => void
}

const styles = StyleSheet.create({
    content: {
        gap: 20,
    },
})

const AddOrEditCategoryModal = ({ editInfo, onClose }: Props) => {
    const showSnackbar = useSnackbar()

    const { mutate: upsertCategory } = useUpsertProblemCategoryMutation()

    const form = useForm<ProblemCategoryFormData>({
        defaultValues: {
            ...editInfo,
        },
    })
    const {
        handleSubmit,
        formState: { isDirty },
    } = form

    const onSubmit = useCallback(
        (data: ProblemCategoryFormData) => {
            upsertCategory(
                { ...data, id: editInfo?.id },
                {
                    onSuccess: () => {
                        onClose()
                        showSnackbar('Die Kategorie wurde erfolgreich gespeichert.')
                    },
                },
            )
        },
        [editInfo?.id, onClose, showSnackbar, upsertCategory],
    )

    const title = useMemo(
        () => (editInfo ? 'Kategorie bearbeiten' : 'Kategorie hinzufügen'),
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
                            name='title'
                            label='Name der Kategorie'
                            rules={{
                                required: 'Bitte gebe einen Namen ein.',
                            }}
                        />
                        <IconPicker
                            name='icon'
                            label='Icon der Kategorie'
                            rules={{
                                required: 'Bitte wähle ein Icon aus.',
                            }}
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

export default AddOrEditCategoryModal
