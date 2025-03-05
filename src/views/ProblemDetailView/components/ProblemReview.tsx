import { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { useUpsertProblemMutation } from '~/queries/Problems/useUpsertProblemMutation'
import { useDialog } from '~/shared/context/DialogContext'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import SelectMenu from '~/shared/views/Inputs/SelectMenu'
import TextInput from '~/shared/views/TextInput'
import { Category, Problem } from '~/supabase/types'

const styles = StyleSheet.create({
    footer: {
        alignItems: 'flex-end',
        marginTop: 20,
    },
    header: {
        gap: 10,
        marginBottom: 10,
    },
    subtitle: {
        fontWeight: 'bold',
    },
    wrapper: {
        gap: 10,
    },
})

type Props = {
    problem: Problem
    categories: Category[]
    onClose: () => void
}

const ProblemReview = ({ problem, categories, onClose }: Props) => {
    const confirm = useDialog()

    const form = useForm({
        values: {
            ...problem,
            latitude: undefined,
            longitude: undefined,
            reasonForDeactivation: undefined,
        },
    })
    const {
        handleSubmit,
        formState: { isDirty },
    } = form

    const { mutate: updateProblem, isPending } = useUpsertProblemMutation()

    const onSubmit = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data: any) => {
            confirm({
                title: 'Problem speichern',
                description: 'Möchtest du die Änderungen speichern?',
                acceptLabel: 'Speichern',
                dismissLabel: 'Abbrechen',
                onAccept: () => {
                    updateProblem(data, {
                        onSuccess: onClose,
                        onError: onClose,
                    })
                },
            })
        },
        [confirm, onClose, updateProblem],
    )

    return (
        <FormProvider {...form}>
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <Text style={styles.subtitle}>Handelt es sich um ein ungültiges Problem?</Text>
                    <Text>
                        Passe den Status und die Kategorie des Problems an, um eine Korrektur
                        vorzunehmen.
                    </Text>
                </View>

                <SelectMenu
                    label='Status'
                    name='status'
                    options={[
                        { label: 'Deaktiviert', value: ProblemStatus.Cancelled },
                        { label: 'Zu Erledigen', value: ProblemStatus.ToDo },
                        { label: 'In Bearbeitung', value: ProblemStatus.InProgress },
                        { label: 'Erledigt', value: ProblemStatus.Done },
                    ]}
                />

                <SelectMenu
                    label='Kategorie'
                    name='categoryId'
                    options={categories.map((c) => ({
                        label: c.title,
                        value: c.id,
                    }))}
                />

                <TextInput
                    name='reasonForDeactivation'
                    label='Begründung'
                    multiline={true}
                    disabled={!isDirty}
                    rules={{
                        required: 'Bitte gebe eine Begründung für die Änderung ein.',
                    }}
                />

                <View style={styles.footer}>
                    <Button
                        mode='contained'
                        loading={isPending}
                        disabled={isPending || !isDirty}
                        onPress={handleSubmit(onSubmit)}
                    >
                        Speichern
                    </Button>
                </View>
            </View>
        </FormProvider>
    )
}

export default ProblemReview
