import { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, IconButton, Text } from 'react-native-paper'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Authority } from '~/shared/models/Authority'

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

type Props = {
    item: Authority
    onEdit: (item: Authority) => void
    onDelete: (item: Authority) => void
}

const AuthorityListItem = ({ item, onEdit: onEditProp, onDelete: onDeleteProp }: Props) => {
    const onEdit = useCallback(() => onEditProp(item), [item, onEditProp])
    const onDelete = useCallback(() => onDeleteProp(item), [item, onDeleteProp])

    return (
        <Card style={[globalStyles.card, styles.card]}>
            <View style={styles.wrapper}>
                <View style={globalStyles.flexBox}>
                    <Text variant='headlineMedium'>{item.name}</Text>
                    <Text>@{item.domain}</Text>
                </View>
                <View style={styles.buttons}>
                    <IconButton
                        mode='contained'
                        icon='pencil'
                        onPress={onEdit}
                    />
                    <IconButton
                        mode='contained'
                        icon='trash-can'
                        onPress={onDelete}
                    />
                </View>
            </View>
        </Card>
    )
}

export default AuthorityListItem
