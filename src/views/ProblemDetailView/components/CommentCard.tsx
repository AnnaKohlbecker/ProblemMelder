import { format } from 'date-fns/format'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'
import { CommentWithUserData } from '~/supabase/types'

type Props = {
    commentWithUserData: CommentWithUserData
}

const styles = StyleSheet.create({
    content: {
        borderLeftColor: colors.secondary,
        borderLeftWidth: 2,
        marginLeft: 2,
        paddingLeft: 6,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
        marginBottom: 4,
    },
    ownContent: {
        color: colors.primary,
        fontWeight: 'bold',
    },
})

const CommentCard = ({ commentWithUserData }: Props) => {
    const { session } = useAuth()

    return (
        <View>
            <View style={styles.header}>
                <Text
                    style={
                        (globalStyles.bold,
                        session?.user.id === commentWithUserData.UserData.userId &&
                            styles.ownContent)
                    }
                >
                    {commentWithUserData.UserData.name}
                </Text>
                <Text>{format(commentWithUserData.timestamp, 'dd.MM.yyyy, HH:mm')} Uhr</Text>
            </View>
            <View style={styles.content}>
                <Text>{commentWithUserData.content}</Text>
            </View>
        </View>
    )
}

export default CommentCard
