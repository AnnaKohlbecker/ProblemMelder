import { StyleSheet, View } from 'react-native'
import { Card, Icon, Text } from 'react-native-paper'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Category } from '~/supabase/types'

const styles = StyleSheet.create({
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
}

const CategoryListItem = ({ item }: Props) => {
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
                </View>
            </View>
        </Card>
    )
}

export default CategoryListItem
