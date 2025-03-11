import { ParamListBase, Route, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import * as FileSystem from 'expo-file-system'
import { isNil } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { BackHandler, StyleSheet, View } from 'react-native'
import { Button, ProgressBar, Text } from 'react-native-paper'
import { v4 } from 'react-native-uuid/dist/v4'
import { useUploadImageMutation } from '~/queries/Problems/useUploadImageMutation'
import { useUpsertProblemMutation } from '~/queries/Problems/useUpsertProblemMutation'
import { useUpdateUserDataMutation } from '~/queries/UserData/useUpdateUserDataMutation'
import { useUserByIdQuery } from '~/queries/UserData/useUserByIdQuery'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'
import { useDialog } from '~/shared/context/DialogContext'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { Route as RouteEnum } from '~/shared/enums/Route'
import Header from '~/shared/views/Header'
import { Problem } from '~/supabase/types'
import { REPORT_STEPS } from '~/views/ProblemReport/constants/reportSteps'

type Props = {
    route: Route<RouteEnum>
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
    wrapper: {
        backgroundColor: colors.white,
        paddingBottom: 10,
    },
})

const ProblemReport = ({ route }: Props) => {
    const { session } = useAuth()
    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()

    const [currentStepSerial, setCurrentStepSerial] = useState(1)

    const { data: userData, isLoading: userDataLoading } = useUserByIdQuery({
        userId: session?.user.id,
    })
    const { mutate: updateUserData, isPending: userDataPending } = useUpdateUserDataMutation()

    const showDialog = useDialog()

    const form = useForm<Problem>({
        defaultValues: {
            status: ProblemStatus.ToDo,
            userId: session?.user.id,
        },
    })
    const { handleSubmit, reset, trigger } = form

    const {
        component: CurrentStep,
        serial,
        title,
    } = useMemo(() => {
        const step = REPORT_STEPS.find((x) => x.serial === currentStepSerial)

        if (isNil(step)) {
            setCurrentStepSerial(1)

            return REPORT_STEPS.find((x) => x.serial === 1)!
        }

        return step
    }, [currentStepSerial])

    const progress = useMemo(() => serial / REPORT_STEPS.length, [serial])

    const onClose = useCallback(() => {
        showDialog({
            title: 'Meldung abbrechen?',
            description: 'Deine Eingaben werden nicht gespeichert.',
            onAccept: () => {
                reset()
                navigate(RouteEnum.MAIN)
            },
        })
    }, [navigate, reset, showDialog])

    useEffect(() => {
        const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
            onClose()
            return true
        })

        return () => {
            subscription.remove()
        }
    }, [onClose])

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
                        onSuccess: () => {
                            upsertProblem(
                                {
                                    ...data,
                                    image: imageId,
                                },
                                {
                                    onSuccess: () => {
                                        navigate(RouteEnum.MAIN)
                                    },
                                },
                            )
                            if (!isNil(userData))
                                updateUserData({
                                    ...userData,
                                    points: userData.points + 10,
                                })
                        },
                    },
                )
            })()
        })
    }, [
        currentStepSerial,
        handleSubmit,
        navigate,
        trigger,
        updateUserData,
        uploadImage,
        upsertProblem,
        userData,
    ])

    const isLoading = useMemo(
        () => isUploadingImage || isUpsertingProblem || userDataLoading || userDataPending,
        [isUploadingImage, isUpsertingProblem, userDataLoading, userDataPending],
    )

    return (
        <View style={[globalStyles.flexBox, styles.wrapper]}>
            <FormProvider {...form}>
                <View>
                    <Header
                        route={route}
                        onClose={onClose}
                    />
                    <ProgressBar
                        progress={progress}
                        color={colors.primary}
                        style={styles.progress}
                    />
                    <Text
                        variant='titleMedium'
                        style={styles.stepTitle}
                    >
                        Schritt {serial} von {REPORT_STEPS.length}: {title}
                    </Text>
                </View>
                <View style={globalStyles.flexBox}>
                    <CurrentStep isLoading={isLoading} />
                </View>
                <View style={styles.buttons}>
                    <Button
                        mode='contained'
                        onPress={onPrev}
                        disabled={currentStepSerial === 1 || isUpsertingProblem}
                    >
                        Zurück
                    </Button>
                    <Button
                        mode='contained'
                        onPress={onNext}
                        disabled={isUpsertingProblem}
                        loading={isUpsertingProblem}
                    >
                        {currentStepSerial === REPORT_STEPS.length ? 'Absenden' : 'Weiter'}
                    </Button>
                </View>
            </FormProvider>
        </View>
    )
}

export default ProblemReport
