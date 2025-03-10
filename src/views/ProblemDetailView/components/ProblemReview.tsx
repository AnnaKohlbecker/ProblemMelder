import { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, IconButton, Text } from 'react-native-paper'
import { useUpsertProblemMutation } from '~/queries/Problems/useUpsertProblemMutation'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useDialog } from '~/shared/context/DialogContext'
import { useKeyboard } from '~/shared/context/KeyboardContext'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import SelectMenu from '~/shared/views/Inputs/SelectMenu'
import TextInput from '~/shared/views/TextInput'
import { Category, Problem } from '~/supabase/types'

const styles = StyleSheet.create({
    footer: {
        alignItems: 'flex-end',
        marginTop: 15,
    },
})

type Props = {
    problem: Problem
    categories: Category[]
    onClose: () => void
    onSubmit: () => void
}

const ProblemReview = ({ problem, categories, onClose, onSubmit: onSubmitProp }: Props) => {
    const confirm = useDialog()
    const { isKeyboardVisible } = useKeyboard()

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
            <View
                style={
                    isKeyboardVisible
                        ? globalStyles.contentWrapperWithKeyboard
                        : globalStyles.contentWrapper
                }
            >
                <View style={globalStyles.cardSubtitle}>
                    <IconButton
                        size={20}
                        icon='arrow-left'
                        mode='outlined'
                        onPress={onClose}
                        iconColor={colors.primary}
                    />
                    <Text style={globalStyles.subtitle}>Überprüfung</Text>
                </View>
                <ScrollView>
                    <View style={globalStyles.gap}>
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
                                required: 'Bitte gebe eine Begründung an.',
                            }}
                            multilineHeight={isKeyboardVisible ? 150 : 300}
                        />
                    </View>
                </ScrollView>
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
