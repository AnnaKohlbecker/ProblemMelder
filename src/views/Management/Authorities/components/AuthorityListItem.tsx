import { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Icon, IconButton, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
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
    domain: {
        gap: 4,
    },
    title: {
        fontSize: RFValue(16),
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
                    <Text style={styles.title}>{item.name}</Text>
                    <View style={[globalStyles.flexRow, styles.domain]}>
                        {item.allowSignup ? (
                            <Icon
                                size={18}
                                source='account-lock-open'
                            />
                        ) : (
                            <Icon
                                size={18}
                                source='account-lock'
                            />
                        )}
                        <Text>@{item.domain}</Text>
                    </View>
                </View>
                <View style={styles.buttons}>
                    <IconButton
                        size={16}
                        mode='contained'
                        icon='pencil'
                        onPress={onEdit}
                    />
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

export default AuthorityListItem
