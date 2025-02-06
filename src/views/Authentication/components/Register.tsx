import { useCallback, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Alert, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { useAuthoritiesQuery } from '~/queries/Authorities/useAuthoritiesQuery'
import { useRolesQuery } from '~/queries/Roles/useRolesQuery'
import { supabase } from '~/services/supabase'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Role } from '~/shared/enums/Role'
import TextInput from '~/shared/views/TextInput'

type RegisterModel = {
    email: string
    password: string
    name: string
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

const Register = () => {
    const [registering, setRegistering] = useState(false)

    const form = useForm<RegisterModel>()
    const {
        handleSubmit,
        formState: { isDirty },
    } = form

    const { data: roles, isLoading: rolesLoading } = useRolesQuery()
    const { data: authorities, isLoading: authoritiesLoading } = useAuthoritiesQuery()

    const authorityDomains = useMemo(() => {
        if (!authorities) return []

        return authorities.map((authority) => authority.domain)
    }, [authorities])

    const login = useCallback(
        async ({ name, email, password }: RegisterModel) => {
            if (!isDirty) return

            setRegistering(true)

            const domain = email.split('@')[1]
            const isAuthority = authorityDomains.includes(domain)

            const role = roles?.find(
                (role) => role.name === (isAuthority ? Role.Manager : Role.User),
            )

            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        role,
                        name,
                    },
                },
            })

            setRegistering(false)

            if (!error) return

            Alert.alert('Fehler', 'Ein unerwarteter Fehler ist aufgetreten.')
            // eslint-disable-next-line no-console
            console.error(error)
        },
        [authorityDomains, isDirty, roles],
    )

    const validate = useCallback((val: string) => {
        if (!val.includes('@')) return 'Bitte gebe eine gültige E-Mail-Adresse ein.'

        return true
    }, [])

    return (
        <View style={globalStyles.flexBox}>
            <View style={loginStyles.header}>
                <Text style={loginStyles.headerText}>Registrieren</Text>
            </View>
            <View style={loginStyles.main}>
                <FormProvider {...form}>
                    <TextInput
                        name='name'
                        label='Name'
                        rules={{
                            required: 'Bitte gebe einen Namen ein',
                        }}
                    />
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
                            disabled={!isDirty}
                            loading={rolesLoading || authoritiesLoading || registering}
                        >
                            Registrieren
                        </Button>
                    </View>
                </FormProvider>
            </View>
        </View>
    )
}

export default Register
