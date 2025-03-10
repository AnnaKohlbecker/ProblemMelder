import { StyleSheet, View } from 'react-native'
import { Card, Icon, Text } from 'react-native-paper'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Category } from '~/supabase/types'

const styles = StyleSheet.create({
    card: {
        margin: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: colors.tertiary,
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
                        <Text style={globalStyles.subtitle}>{item.title}</Text>
                    </View>
                </View>
            </View>
        </Card>
    )
}

export default CategoryListItem
