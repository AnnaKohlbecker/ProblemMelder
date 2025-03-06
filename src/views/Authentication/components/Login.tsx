import { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Alert, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import TextInput from '~/shared/views/TextInput'
import { supabase } from '~/supabase'

type LoginModel = {
    email: string
    password: string
}

export const loginStyles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'flex-end',
        display: 'flex',
    },
    header: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    headerText: {
        color: colors.primary,
        fontSize: RFValue(28),
    },
    main: {
        flex: 2,
        gap: 25,
        padding: 30,
    },
})

const Login = () => {
    const [loggingIn, setLoggingIn] = useState(false)

    const form = useForm<LoginModel>()
    const {
        handleSubmit,
        formState: { isDirty },
    } = form

    const login = useCallback(
        async ({ email, password }: LoginModel) => {
            if (!isDirty) return

            setLoggingIn(true)

            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            setLoggingIn(false)

            if (!error) return

            if (error.name === 'AuthApiError') {
                Alert.alert(
                    'Falsche Anmeldedaten',
                    'Die eingegebene E-Mail oder das Passwort ist falsch. Bitte versuche es erneut.',
                )
            } else {
                Alert.alert('Fehler', 'Ein unerwarteter Fehler ist aufgetreten.')
                // eslint-disable-next-line no-console
                console.error(error)
            }
        },
        [isDirty],
    )

    const validate = useCallback((val: string) => {
        if (!val.includes('@')) return 'Bitte gebe eine gültige E-Mail-Adresse ein.'

        return true
    }, [])

    return (
        <View style={globalStyles.flexBoxWithColor}>
            <View style={loginStyles.header}>
                <Text style={loginStyles.headerText}>Anmelden</Text>
            </View>
            <View style={loginStyles.main}>
                <FormProvider {...form}>
                    <TextInput
                        name='email'
                        label='E-Mail Adresse'
                        rules={{
                            required: 'Bitte gebe eine E-Mail Adresse ein',
                            validate,
                        }}
                    />
                    <TextInput
                        name='password'
                        label='Passwort'
                        secureTextEntry={true}
                        rules={{ required: 'Bitte gebe ein Passwort ein.' }}
                    />
                    <View style={loginStyles.buttonContainer}>
                        <Button
                            mode='contained'
                            onPress={handleSubmit(login)}
                            disabled={!isDirty || loggingIn}
                            loading={loggingIn}
                        >
                            Anmelden
                        </Button>
                    </View>
                </FormProvider>
            </View>
        </View>
    )
}

export default Login
