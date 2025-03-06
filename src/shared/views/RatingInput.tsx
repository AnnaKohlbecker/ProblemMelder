import { isNil } from 'lodash'
import { useCallback, useMemo } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { HelperText, IconButton, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'

type Props = {
    name: string
    label?: string
    helperText?: string
    rules?: UseControllerProps['rules']
    disabled?: boolean
    /**
     * Amount of stars to display
     *
     * @default 5
     */
    amount?: number
    emptyIcon?: string
    filledIcon?: string
}

const styles = StyleSheet.create({
    label: {
        fontSize: RFValue(16),
        fontWeight: 'bold',
    },
    starButton: {
        margin: 0,
        padding: 0,
    },
    starContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
})

const RatingInput = ({
    label,
    name,
    amount = 5,
    helperText,
    rules,
    disabled,
    emptyIcon = 'star',
    filledIcon = 'star-outline',
}: Props) => {
    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({
        name,
        rules,
    })

    const starButtons = useMemo(() => {
        return Array.from({ length: amount }, (_, i) => {
            const key = i + 1

            return (
                <IconButton
                    key={key}
                    size={40}
                    disabled={disabled}
                    style={styles.starButton}
                    onPress={() => {
                        onChange(key)
                    }}
                    iconColor={!isNil(value) && value >= key ? colors.primary : undefined}
                    icon={!isNil(value) && value >= key ? filledIcon : emptyIcon}
                />
            )
        })
    }, [amount, disabled, value, emptyIcon, filledIcon, onChange])

    const onClear = useCallback(() => {
        onChange(null)
    }, [onChange])

    return (
        <View>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={globalStyles.flexRowWithSpace}>
                <View style={styles.starContainer}>{starButtons}</View>
                {!isNil(value) && (
                    <IconButton
                        icon='trash-can'
                        mode='outlined'
                        onPress={onClear}
                    />
                )}
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

export default RatingInput
