import { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, IconButton, Text } from 'react-native-paper'
import { globalStyles } from '~/shared/constants/globalStyles'
import { UserData } from '~/supabase/types'

type Props = {
    item: UserData
    onDelete: (employee: UserData) => void
}

const styles = StyleSheet.create({
    buttons: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    card: {
        margin: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    wrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 2,
    },
})

export const EmployeeListItem = ({ onDelete: onDeleteProp, item }: Props) => {
    const onDelete = useCallback(() => {
        onDeleteProp(item)
    }, [item, onDeleteProp])

    return (
        <Card style={[globalStyles.card, styles.card]}>
            <View style={styles.wrapper}>
                <View style={globalStyles.flexBox}>
                    <Text style={globalStyles.title}>{item.name}</Text>
                </View>
                <View style={styles.buttons}>
                    <IconButton
                        size={16}
                        mode='contained'
                        icon='trash-can'
                        onPress={onDelete}
                    />
                </View>
            </View>
        </Card>
    )
}
