import { View } from 'react-native'
import { Card, Text, TouchableRipple } from 'react-native-paper'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Authority } from '~/supabase/types'

type Props = {
    authority: Authority
    onCardPress?: () => void
}

const AuthorityCard = ({ authority, onCardPress }: Props) => {
    return (
        <Card style={globalStyles.card}>
            <TouchableRipple onPress={onCardPress}>
                <View style={globalStyles.flexRowWithSpace}>
                    <View style={globalStyles.flexRow}>
                        <Text style={globalStyles.title}>
                            {authority.name.length > 25
                                ? `${authority.name.slice(0, 25)}...`
                                : authority.name}
                        </Text>
                    </View>
                </View>
            </TouchableRipple>
        </Card>
    )
}

export default AuthorityCard
