import * as FileSystem from 'expo-file-system'
import { isNil } from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { Appbar, Button, ProgressBar, Text } from 'react-native-paper'
import { v4 } from 'react-native-uuid/dist/v4'
import { useUploadImageMutation } from '~/queries/Problems/useUploadImageMutation'
import { useUpsertProblemMutation } from '~/queries/Problems/useUpsertProblemMutation'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'
import { useDialog } from '~/shared/context/DialogContext'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { Problem } from '~/shared/models/Problem'
import LocationSelection from '~/shared/views/Inputs/LocationSelection'
import PictureSelection from '~/shared/views/Inputs/PictureSelection'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import TextInput from '~/shared/views/TextInput'

type Props = {
    onClose: () => void
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    formWrapper: {
        gap: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    progress: {
        backgroundColor: colors.secondary,
    },
    stepTitle: {
        paddingHorizontal: 10,
    },
})

const REPORT_STEPS = [
    {
        serial: 1,
        title: 'Standort des Problems',
    },
    {
        serial: 2,
        title: 'Bild des Problems',
    },
    {
        serial: 3,
        title: 'Beschreibung des Problems',
    },
    {
        serial: 4,
        title: 'Zuständige Stelle',
    },
    {
        serial: 5,
        title: 'Überprüfen',
    },
]

const ProblemReport = ({ onClose: onCloseProp }: Props) => {
    const { session } = useAuth()
    const [currentStepSerial, setCurrentStepSerial] = useState(1)

    const showDialog = useDialog()

    const form = useForm<Problem>({
        defaultValues: {
            status: ProblemStatus.ToDo,
            authorityId: 1,
            userId: session?.user.id,
        },
    })
    const { handleSubmit, reset, trigger } = form

    const currentStep = useMemo(() => {
        const step = REPORT_STEPS.find((x) => x.serial === currentStepSerial)

        if (isNil(step)) {
            setCurrentStepSerial(1)
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return REPORT_STEPS.find((x) => x.serial === 1)!
        }

        return step
    }, [currentStepSerial])

    const progress = useMemo(() => currentStep.serial / REPORT_STEPS.length, [currentStep])

    const onClose = useCallback(() => {
        showDialog({
            title: 'Meldung abbrechen?',
            description: 'Deine Eingaben werden nicht gespeichert.',
            onAccept: () => {
                reset()
                onCloseProp()
            },
        })
    }, [onCloseProp, reset, showDialog])

    const onPrev = useCallback(() => {
        setCurrentStepSerial((cur) => cur - 1)
    }, [])

    const { mutate: uploadImage, isPending: isUploadingImage } = useUploadImageMutation()
    const { mutate: upsertProblem, isPending: isUpsertingProblem } = useUpsertProblemMutation()

    const onNext = useCallback(() => {
        if (currentStepSerial !== REPORT_STEPS.length) {
            trigger().then((isValid) => {
                if (!isValid) return
                setCurrentStepSerial((cur) => cur + 1)
            })
            return
        }

        trigger().then((isValid) => {
            if (!isValid) return

            handleSubmit(async (data) => {
                const imageId = v4()

                const image = await FileSystem.readAsStringAsync(data.image, {
                    encoding: FileSystem.EncodingType.Base64,
                })

                uploadImage(
                    {
                        file: image,
                        path: imageId,
                    },
                    {
                        onSuccess: () =>
                            upsertProblem(
                                {
                                    ...data,
                                    image: imageId,
                                },
                                {
                                    onSuccess: () => {
                                        onCloseProp()
                                    },
                                },
                            ),
                    },
                )
            })()
        })
    }, [currentStepSerial, handleSubmit, onCloseProp, trigger, uploadImage, upsertProblem])

    return (
        <FormProvider {...form}>
            <View style={globalStyles.flexBox}>
                <View>
                    <Appbar.Header style={globalStyles.appbar}>
                        <Appbar.BackAction onPress={onClose} />
                        <Appbar.Content title='Problem melden' />
                    </Appbar.Header>
                    <ProgressBar
                        progress={progress}
                        color={colors.primary}
                        style={styles.progress}
                    />
                    <Text
                        variant='titleMedium'
                        style={styles.stepTitle}
                    >
                        Schritt {currentStep.serial} von {REPORT_STEPS.length}: {currentStep.title}
                    </Text>
                </View>
                <View style={globalStyles.flexBox}>
                    {currentStep.serial === 1 && <LocationSelection name='location' />}
                    {currentStep.serial === 2 && <PictureSelection name='image' />}
                    {currentStep.serial === 3 && (
                        <View style={[globalStyles.flexBox, styles.formWrapper]}>
                            <TextInput
                                name='title'
                                label='Titel'
                                rules={{
                                    required: 'Bitte gebe einen Titel ein.',
                                }}
                                helperText='Kurze Problembeschreibung'
                            />
                            <TextInput
                                name='description'
                                label='Beschreibung'
                                multiline
                                rules={{
                                    required: 'Bitte gebe eine Beschreibung ein.',
                                }}
                                helperText='Problembeschreibung mit allen relevanten Informationen'
                            />
                        </View>
                    )}
                    {currentStep.serial === 4 && (
                        <View style={globalStyles.flexBox}>
                            <Text>
                                Hier kommt ne coole Auswahl hin, jetzt ist es erstmal immer 1 lol.
                            </Text>
                        </View>
                    )}
                    {currentStep.serial === 5 && (
                        <View style={globalStyles.flexBox}>
                            {(isUploadingImage || isUpsertingProblem) && <LoadingSpinner />}
                            <Text>Hier kommt ne coole Zusammenfassung hin.</Text>
                        </View>
                    )}
                </View>
                <View style={styles.buttons}>
                    <Button
                        mode='contained'
                        onPress={onPrev}
                        disabled={currentStepSerial === 1}
                    >
                        Zurück
                    </Button>
                    <Button
                        mode='contained'
                        onPress={onNext}
                    >
                        {currentStepSerial === REPORT_STEPS.length ? 'Absenden' : 'Weiter'}
                    </Button>
                </View>
            </View>
        </FormProvider>
    )
}

export default ProblemReport
