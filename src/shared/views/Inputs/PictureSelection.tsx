import { CameraView, useCameraPermissions } from 'expo-camera'
import isNil from 'lodash/isNil'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
// eslint-disable-next-line no-restricted-imports
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, IconButton, Text } from 'react-native-paper'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import LoadingSpinner from '~/shared/views/LoadingSpinner'

type Props = {
    name: string
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    camera: {
        borderColor: colors.secondary,
        borderWidth: 1,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    error: {
        color: colors.primary,
    },
    flashlight: {
        alignSelf: 'flex-end',
    },
    header: {
        margin: 10,
    },
})

const PictureSelection = ({ name }: Props) => {
    const cameraRef = useRef<CameraView>(null)
    const [imageLoading, setImageLoading] = useState(false)

    const [enableTorch, setEnableTorch] = useState(false)

    const [permission, requestPermission] = useCameraPermissions()

    const { trigger } = useForm()

    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({
        name,
        rules: {
            required: 'Bitte mache ein Bild.',
        },
    })

    const takePicture = useCallback(() => {
        if (isNil(cameraRef.current)) return

        cameraRef.current
            .takePictureAsync({
                quality: 1,
                base64: true,
            })
            .then((data) => {
                if (isNil(data)) return

                onChange(data.uri)
                trigger()
                setImageLoading(false)
            })
    }, [onChange, trigger])

    const retry = useCallback(() => {
        onChange(undefined)
    }, [onChange])

    useEffect(() => {
        if (permission?.granted) return

        requestPermission()
    }, [permission, requestPermission])

    return (
        <View style={globalStyles.flexBox}>
            <View style={styles.header}>
                <Text
                    variant='bodyMedium'
                    style={globalStyles.mb}
                >
                    Mache ein Bild des Problems.
                </Text>
                {error && <Text style={styles.error}>{error.message}</Text>}
            </View>
            {value ? (
                <View style={globalStyles.flexBox}>
                    <Image
                        style={[globalStyles.flexBox, styles.camera]}
                        src={value}
                    />
                    <View style={[styles.buttonContainer, globalStyles.mb]}>
                        <Button
                            mode='contained'
                            onPress={retry}
                        >
                            Erneut aufnehmen
                        </Button>
                    </View>
                </View>
            ) : (
                <CameraView
                    ref={cameraRef}
                    facing='back'
                    enableTorch={enableTorch}
                    style={[globalStyles.flexBox, styles.camera]}
                >
                    <TouchableOpacity style={styles.flashlight}>
                        <IconButton
                            mode='contained'
                            size={20}
                            onPress={() => setEnableTorch((prev) => !prev)}
                            icon={enableTorch ? 'flashlight' : 'flashlight-off'}
                        />
                    </TouchableOpacity>
                    <View style={[globalStyles.flexBox, styles.buttonContainer]}>
                        <TouchableOpacity>
                            {imageLoading ? (
                                <LoadingSpinner />
                            ) : (
                                <IconButton
                                    mode='contained'
                                    icon='camera'
                                    size={40}
                                    onPress={() => {
                                        setImageLoading(true)
                                        takePicture()
                                    }}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                </CameraView>
            )}
        </View>
    )
}

export default PictureSelection
