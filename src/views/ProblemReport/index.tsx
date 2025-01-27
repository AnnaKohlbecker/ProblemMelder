import { isNil } from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { Appbar, Button, Portal, ProgressBar, Text } from 'react-native-paper'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useDialog } from '~/shared/context/DialogContext'
import LocationSelection from '~/shared/views/Inputs/LocationSelection'

type Props = {
    onClose: () => void
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
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
        title: 'Bilder des Problems',
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
    const showDialog = useDialog()

    const form = useForm()
    const { handleSubmit, reset, trigger } = form

    const [currentStepSerial, setCurrentStepSerial] = useState(1)

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

    const onNext = useCallback(() => {
        if (currentStepSerial !== REPORT_STEPS.length - 1) {
            setCurrentStepSerial((cur) => cur + 1)
            return
        }

        trigger().then((isValid) => {
            if (!isValid) return

            handleSubmit((data) => {})()
        })
    }, [currentStepSerial, handleSubmit, trigger])

    return (
        <Portal>
            <FormProvider {...form}>
                <View style={[globalStyles.flexBox, { backgroundColor: colors.white }]}>
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
                            Schritt {currentStep.serial} von {REPORT_STEPS.length}:{' '}
                            {currentStep.title}
                        </Text>
                    </View>
                    <View style={globalStyles.flexBox}>
                        {currentStep.serial === 1 && <LocationSelection name='location' />}
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
                            {currentStepSerial === REPORT_STEPS.length - 1 ? 'Absenden' : 'Weiter'}
                        </Button>
                    </View>
                </View>
            </FormProvider>
        </Portal>
    )
}

export default ProblemReport
