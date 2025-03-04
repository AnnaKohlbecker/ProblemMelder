import { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { useUpsertProblemMutation } from '~/queries/Problems/useUpsertProblemMutation'
import { useDialog } from '~/shared/context/DialogContext'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { Problem } from '~/shared/models/Problem'
import TextInput from '~/shared/views/TextInput'

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
    onClose: () => void
}

const ProblemReactivation = ({ problem, onClose }: Props) => {
    const confirm = useDialog()

    const form = useForm({
        values: {
            ...problem,
            latitude: undefined,
            longitude: undefined,
            reason: undefined,
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
            data.status = ProblemStatus.ToDo
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
                    <Text style={styles.subtitle}>Wurde das Problem nicht gelöst?</Text>
                    <Text>
                        Wenn das Problem nicht zufriedenstellend gelöst wurde, kannst du es
                        reaktivieren.
                    </Text>
                </View>

                <TextInput
                    name='reason'
                    label='Begründung'
                    multiline={true}
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
                        Reaktivieren
                    </Button>
                </View>
            </View>
        </FormProvider>
    )
}

export default ProblemReactivation
