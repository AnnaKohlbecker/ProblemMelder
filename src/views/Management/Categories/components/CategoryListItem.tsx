import { useCallback, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Icon, IconButton, Text } from 'react-native-paper'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Authority, Category } from '~/supabase/types'

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
    gap: {
        gap: 4,
    },
    wrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 2,
    },
})

type Props = {
    item: Category
    authorities: Authority[]
    onEdit: (item: Category) => void
    onDelete: (item: Category) => void
}

const CategoryListItem = ({
    item,
    authorities,
    onEdit: onEditProp,
    onDelete: onDeleteProp,
}: Props) => {
    const onEdit = useCallback(() => {
        onEditProp(item)
    }, [item, onEditProp])
    const onDelete = useCallback(() => {
        onDeleteProp(item)
    }, [item, onDeleteProp])

    const authority = useMemo(() => {
        return authorities.find((authority) => authority.id === item.authorityId)
    }, [authorities, item.authorityId])

    return (
        <Card style={[globalStyles.card, styles.card]}>
            <View style={styles.wrapper}>
                <View style={globalStyles.flexBox}>
                    <View style={[globalStyles.flexRow, styles.gap]}>
                        {item.icon ? (
                            <Icon
                                size={24}
                                source={item.icon}
                            />
                        ) : (
                            <Icon
                                size={24}
                                source='select'
                            />
                        )}
                        <Text style={globalStyles.title}>{item.title}</Text>
                    </View>
                    <Text>{authority?.name}</Text>
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

export default CategoryListItem
