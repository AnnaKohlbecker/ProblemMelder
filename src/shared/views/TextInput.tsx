import { isNil } from 'lodash'
import { useMemo } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
// eslint-disable-next-line no-restricted-imports
import { TextInput as BaseInput, HelperText } from 'react-native-paper'

type Props = {
    name: string
    label?: string
    helperText?: string
    rules?: UseControllerProps['rules']
    disabled?: boolean
    /**
     * Whether or not the value of this field should be obscured.
     *
     * @default false
     */
    secureTextEntry?: boolean
    /**
     * Whether or not this field should allow multiple lines of text.
     *
     * @default false
     */
    multiline?: boolean
}

const styles = StyleSheet.create({
    multiline: {
        minHeight: 140,
    },
})

const TextInput = ({
    label,
    helperText,
    name,
    rules,
    secureTextEntry = false,
    multiline = false,
    disabled,
}: Props) => {
    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({ name, rules })

    const style = useMemo(() => (multiline ? styles.multiline : undefined), [multiline])

    return (
        <View>
            <BaseInput
                value={value}
                style={style}
                label={label}
                mode='outlined'
                error={!!error}
                disabled={disabled}
                multiline={multiline}
                onChangeText={onChange}
                secureTextEntry={secureTextEntry}
            />
            {(!isNil(helperText) || !isNil(error)) && (
                <HelperText
                    visible={true}
                    type={error ? 'error' : 'info'}
                    padding='none'
                >
                    {error?.message ?? helperText}
                </HelperText>
            )}
        </View>
    )
}
export default TextInput
