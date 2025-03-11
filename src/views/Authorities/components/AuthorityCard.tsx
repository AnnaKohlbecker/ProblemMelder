import { StyleSheet, View } from 'react-native'
import { Card, Text, TouchableRipple } from 'react-native-paper'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Authority } from '~/supabase/types'

type Props = {
    authority: Authority
    onCardPress?: () => void
}

const styles = StyleSheet.create({
    title: {
        padding: 10,
    },
})

const AuthorityCard = ({ authority, onCardPress }: Props) => {
    return (
        <Card style={globalStyles.card}>
            <TouchableRipple onPress={onCardPress}>
                <View style={globalStyles.flexRowWithSpace}>
                    <View style={globalStyles.flexRow}>
                        <Text
                            style={[globalStyles.title, styles.title]}
                            numberOfLines={1}
                            ellipsizeMode='tail'
                        >
                            {authority.name}
                        </Text>
                    </View>
                </View>
            </TouchableRipple>
        </Card>
    )
}

export default AuthorityCard
