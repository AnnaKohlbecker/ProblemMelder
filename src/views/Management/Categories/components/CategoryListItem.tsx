import { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Icon, IconButton, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { globalStyles } from '~/shared/constants/globalStyles'
import { ProblemCategory } from '~/shared/models/ProblemCategory'

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
    item: ProblemCategory
    onEdit: (item: ProblemCategory) => void
    onDelete: (item: ProblemCategory) => void
}

const CategoryListItem = ({ item, onEdit: onEditProp, onDelete: onDeleteProp }: Props) => {
    const onEdit = useCallback(() => onEditProp(item), [item, onEditProp])
    const onDelete = useCallback(() => onDeleteProp(item), [item, onDeleteProp])

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
                        <Text style={styles.title}>{item.title}</Text>
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

export default CategoryListItem
