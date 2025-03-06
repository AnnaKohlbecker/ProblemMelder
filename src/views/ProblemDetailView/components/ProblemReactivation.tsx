import { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { Button, IconButton, Text } from 'react-native-paper'
import { useUpsertProblemMutation } from '~/queries/Problems/useUpsertProblemMutation'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useDialog } from '~/shared/context/DialogContext'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import TextInput from '~/shared/views/TextInput'
import { Problem } from '~/supabase/types'

const styles = StyleSheet.create({
    footer: {
        alignItems: 'flex-end',
        marginTop: 20,
    },
    header: {
        gap: 10,
        marginBottom: 10,
    },
    wrapper: {
        gap: 10,
    },
})

type Props = {
    problem: Problem
    onClose: () => void
    onSubmit: () => void
}

const ProblemReactivation = ({ problem, onClose, onSubmit: onSubmitProp }: Props) => {
    const confirm = useDialog()

    const form = useForm({
        values: {
            ...problem,
            latitude: undefined,
            longitude: undefined,
            reasonForReactivation: undefined,
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
                        onSuccess: onSubmitProp,
                        onError: onSubmitProp,
                    })
                },
            })
        },
        [confirm, onSubmitProp, updateProblem],
    )

    return (
        <FormProvider {...form}>
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <View style={globalStyles.flexRow}>
                        <IconButton
                            size={20}
                            icon='arrow-left'
                            mode='outlined'
                            onPress={onClose}
                            iconColor={colors.primary}
                        />
                        <Text style={globalStyles.subtitle}>Wurde das Problem nicht gelöst?</Text>
                    </View>
                    <Text>
                        Wenn das Problem nicht zufriedenstellend gelöst wurde, kannst du es
                        reaktivieren.
                    </Text>
                </View>

                <TextInput
                    name='reasonForReactivation'
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
