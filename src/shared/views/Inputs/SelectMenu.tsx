import { useCallback, useMemo, useState } from 'react'
import { UseControllerProps, useController } from 'react-hook-form'
import { FlatList, StyleSheet, View } from 'react-native'
// eslint-disable-next-line no-restricted-imports
import { HelperText, Modal, Portal, Text, TextInput, TouchableRipple } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'

const styles = StyleSheet.create({
    listContainer: {
        maxHeight: 340,
    },
    modal: {
        backgroundColor: colors.white,
        borderRadius: 10,
        marginHorizontal: 20,
        maxHeight: '80%',
        padding: 20,
    },
    noOptionsText: {
        textAlign: 'center',
    },
    option: {
        fontSize: RFValue(14),
        padding: 10,
    },
})

type SelectOption = {
    label: string
    value: number
}

type Props = {
    name: string
    label: string
    options: SelectOption[]
    helperText?: string
    rules?: UseControllerProps['rules']
    disabled?: boolean
}

const SelectMenu = ({ name, rules, helperText, label, options, disabled }: Props) => {
    const [visible, setVisible] = useState(false)

    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({ name, rules })

    const openModal = useCallback(() => {
        if (disabled) return

        setVisible(true)
    }, [disabled])
    const closeModal = useCallback(() => setVisible(false), [setVisible])

    const handleSelect = useCallback(
        (value: number) => {
            if (disabled) return

            onChange(value)
            closeModal()
        },
        [closeModal, disabled, onChange],
    )

    const displayValue = useMemo(
        () => options.find((o) => o.value === value)?.label,
        [options, value],
    )

    return (
        <View>
            <TextInput
                label={label}
                value={displayValue}
                mode='outlined'
                error={!!error}
                onFocus={(e) => {
                    openModal()
                    e.target.blur()
                }}
                disabled={disabled}
                showSoftInputOnFocus={false}
                right={
                    <TextInput.Icon
                        icon='menu-down'
                        onPress={openModal}
                    />
                }
            />
            {(helperText || error) && (
                <HelperText
                    visible={true}
                    type={error ? 'error' : 'info'}
                    padding='none'
                >
                    {error?.message ?? helperText}
                </HelperText>
            )}
            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={closeModal}
                    contentContainerStyle={styles.modal}
                >
                    {options.length === 0 && (
                        <Text style={styles.noOptionsText}>Keine Optionen vorhanden.</Text>
                    )}
                    <FlatList
                        style={styles.listContainer}
                        data={options}
                        renderItem={({ item }) => (
                            <TouchableRipple
                                key={item.value.toString()}
                                onPress={() => handleSelect(item.value)}
                            >
                                <Text style={styles.option}>{item.label}</Text>
                            </TouchableRipple>
                        )}
                    />
                </Modal>
            </Portal>
        </View>
    )
}

export default SelectMenu
