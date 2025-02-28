import { useCallback, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import { Button, Dialog, Portal } from 'react-native-paper'
import { useAuthoritiesQuery } from '~/queries/Authorities/useAuthoritiesQuery'
import { useUpsertCategoryMutation } from '~/queries/Categories/useUpsertCategoryMutation'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useSnackbar } from '~/shared/context/SnackbarContext'
import { Category } from '~/shared/models/Category'
import IconPicker from '~/shared/views/Inputs/IconPicker'
import SelectMenu from '~/shared/views/Inputs/SelectMenu'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import TextInput from '~/shared/views/TextInput'
import { ProblemCategoryFormData } from '~/views/Management/Categories/types/ProblemCategoryFormData'

type Props = {
    editInfo: Category | undefined
    onClose: () => void
}

const styles = StyleSheet.create({
    content: {
        gap: 20,
    },
})

const AddOrEditCategoryModal = ({ editInfo, onClose }: Props) => {
    const showSnackbar = useSnackbar()

    const { mutate: upsertCategory } = useUpsertCategoryMutation()

    const { data: authorities, isLoading: authoritiesLoading } = useAuthoritiesQuery()

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

    const authorityOptions = useMemo(
        () =>
            authorities?.map((authority) => ({
                label: authority.name,
                value: authority.id,
            })) ?? [],
        [authorities],
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
                        <TextInput
                            name='description'
                            label='Beschreibung'
                            multiline={true}
                            rules={{
                                required: 'Bitte gebe eine Beschreibung ein.',
                            }}
                            helperText='Kategoriebeschreibung für unentschlossene Bürgerinnen und Bürger.'
                        />
                        {authoritiesLoading ? (
                            <LoadingSpinner />
                        ) : (
                            <SelectMenu
                                label='Zuständige Behörde'
                                name='authorityId'
                                options={authorityOptions}
                                disabled={authoritiesLoading}
                                rules={{
                                    required: 'Bitte wähle eine Behörde aus.',
                                }}
                            />
                        )}
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
