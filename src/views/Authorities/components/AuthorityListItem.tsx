import { StyleSheet, View } from 'react-native'
import { Card, Text } from 'react-native-paper'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Authority } from '~/supabase/types'

const styles = StyleSheet.create({
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
}

const AuthorityListItem = ({ item }: Props) => {
    return (
        <Card style={[globalStyles.card, styles.card]}>
            <View style={styles.wrapper}>
                <View style={globalStyles.flexBox}>
                    <Text style={globalStyles.title}>{item.name}</Text>
                    <View style={globalStyles.flexRow}>
                        <Text>Hier noch mehr Details / Details on Click</Text>
                    </View>
                </View>
            </View>
        </Card>
    )
}

export default AuthorityListItem
