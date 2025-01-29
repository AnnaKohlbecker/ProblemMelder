import { useCallback, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Icon, IconButton, Modal, Portal, Text, TouchableRipple } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'
import { theme } from '~/shared/constants/theme'

const styles = StyleSheet.create({
    button: {
        borderRadius: 100,
        height: 50,
        padding: 10,
        width: 50,
    },
    modal: {
        backgroundColor: colors.white,
        borderRadius: 10,
        marginHorizontal: 20,
        padding: 20,
    },
    optionText: {
        fontSize: RFValue(16),
        lineHeight: 25,
        paddingLeft: 20,
    },
    options: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
})

type Props = {
    icon: string
    options: { label: string; iconSource: string }[]
    onChange: (selectedOption: string) => void
    children?: React.ReactNode
}

/**
 * A component to open a select modal with options and custom content
 */
const SelectButton = ({ icon, options, onChange, children }: Props) => {
    const [visible, setVisible] = useState(false)

    const openModal = useCallback(() => setVisible(true), [setVisible])
    const closeModal = useCallback(() => setVisible(false), [setVisible])

    const handleSelect = useCallback(
        (item: string) => {
            onChange(item)
            closeModal()
        },
        [closeModal, onChange],
    )

    return (
        <View>
            <IconButton
                icon={icon}
                mode='contained'
                onPress={(e) => {
                    openModal()
                    e.target.blur()
                }}
                style={styles.button}
                theme={theme}
            />
            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={closeModal}
                    contentContainerStyle={styles.modal}
                >
                    <View style={styles.options}>{children}</View>
                    <FlatList
                        data={options}
                        keyExtractor={(item) => item.label}
                        renderItem={({ item }) => (
                            <TouchableRipple onPress={() => handleSelect(item.label)}>
                                <View style={styles.options}>
                                    <Icon
                                        source={item.iconSource}
                                        size={30}
                                        theme={theme}
                                    />
                                    <Text style={styles.optionText}>{item.label}</Text>
                                </View>
                            </TouchableRipple>
                        )}
                    />
                </Modal>
            </Portal>
        </View>
    )
}

export default SelectButton
