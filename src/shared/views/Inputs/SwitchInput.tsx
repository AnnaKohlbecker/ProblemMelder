import { isNil } from 'lodash'
import { useController, UseControllerProps } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
// eslint-disable-next-line no-restricted-imports
import { HelperText, Switch, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'

type Props = {
    name: string
    label: string
    helperText?: string
    rules?: UseControllerProps['rules']
    disabled?: boolean
}

const styles = StyleSheet.create({
    text: {
        fontSize: RFValue(14),
    },
    wrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'flex-start',
    },
})

const SwitchInput = ({ label, helperText, name, rules, disabled }: Props) => {
    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({ name, rules })

    return (
        <View>
            <View style={styles.wrapper}>
                <Switch
                    value={value}
                    onValueChange={onChange}
                    disabled={disabled}
                />
                <Text
                    style={styles.text}
                    onPress={() => {
                        onChange(!value)
                    }}
                >
                    {label}
                </Text>
            </View>
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
export default SwitchInput
