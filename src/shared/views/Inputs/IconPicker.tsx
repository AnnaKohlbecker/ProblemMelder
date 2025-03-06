import { useState } from 'react'
import { UseControllerProps, useController } from 'react-hook-form'
import { FlatList, Modal, ScrollView, StyleSheet, View } from 'react-native'
import { Button, HelperText, IconButton, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'

const icons = [
    'alert-circle',
    'car-wrench',
    'dump-truck',
    'home-alert',
    'lightning-bolt',
    'road-variant',
    'water',
    'trash-can',
    'tree',

    'fire',
    'gas-cylinder',
    'power-plug-off',
    'lightbulb',
    'traffic-light',
    'human-male-female',
    'tree-outline',
    'water-pump',
    'biohazard',

    'police-badge',
    'hospital',
    'waves',
    'signal-off',
    'school',
    'parking',
]

const styles = StyleSheet.create({
    backdrop: {
        alignItems: 'center',
        backgroundColor: colors.backdrop,
        flex: 1,
        justifyContent: 'center',
    },
    buttonWrapper: {
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 10,
        gap: 10,
        justifyContent: 'center',
        padding: 20,
        width: 300,
    },
    header: {
        alignItems: 'center',
    },
    input: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
    },
    label: {
        fontSize: RFValue(14),
    },
    subtitle: {
        fontSize: RFValue(10),
    },
    title: {
        fontSize: RFValue(18),
        fontWeight: 'bold',
        marginBottom: 10,
    },
})

type Props = {
    name: string
    label: string
    rules?: UseControllerProps['rules']
}

const IconPicker = ({ name, label, rules }: Props) => {
    const [visible, setVisible] = useState(false)

    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({
        name,
        rules,
    })

    const handleSelect = (icon: string) => {
        onChange(icon)
        setVisible(false)
    }

    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.input}>
                <IconButton
                    size={30}
                    icon={value ?? 'select'}
                />
                <Button
                    icon='magnify'
                    mode='outlined'
                    onPress={() => {
                        setVisible(true)
                    }}
                >
                    Icon auswählen
                </Button>
            </View>
            {error && (
                <HelperText
                    type='error'
                    visible={true}
                    padding='none'
                >
                    {error.message}
                </HelperText>
            )}

            <Modal
                visible={visible}
                transparent={true}
                animationType='slide'
            >
                <View style={styles.backdrop}>
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Wähle ein Icon aus</Text>
                            <Text style={styles.subtitle}>
                                Du kannst Vertikal scrollen, um mehr Icons zu sehen!
                            </Text>
                        </View>
                        <ScrollView horizontal={true}>
                            <FlatList
                                data={icons}
                                numColumns={8}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <IconButton
                                        size={40}
                                        icon={item}
                                        onPress={() => {
                                            handleSelect(item)
                                        }}
                                    />
                                )}
                            />
                        </ScrollView>
                        <View style={styles.buttonWrapper}>
                            <Button
                                onPress={() => {
                                    setVisible(false)
                                }}
                                buttonColor={colors.secondary}
                                mode='elevated'
                            >
                                Abbrechen
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default IconPicker
