import { isNil } from 'lodash'
import { useCallback } from 'react'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { useCreateProblemCommentMutation } from '~/queries/ProblemComments/useCreateProblemCommentMutation'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'
import ChatInput from '~/shared/views/Inputs/ChatInput'
import { CommentWithUserData, Problem } from '~/supabase/types'
import CommentCard from '~/views/ProblemDetailView/components/CommentCard'

type Props = {
    problem: Problem
    comments: CommentWithUserData[]
    onSend: () => void
    onClose: () => void
}

const styles = StyleSheet.create({
    contentContainer: {
        gap: 10,
        flex: 1,
    },
    wrapper: {
        maxHeight: '80%',
        minHeight: 300,
    },
    subtitle: {
        fontSize: RFValue(14),
        fontWeight: 'bold',
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

const ProblemComments = ({ problem, comments, onSend: onSendProp, onClose }: Props) => {
    const { session } = useAuth()

    const { mutate: createComment, isPending: creatingComment } = useCreateProblemCommentMutation()

    const onSend = useCallback(
        (content: string) => {
            createComment(
                {
                    content,
                    problemId: problem.id,
                },
                {
                    onSuccess: onSendProp,
                },
            )
        },
        [createComment, onSendProp, problem.id],
    )

    const renderItem = useCallback<ListRenderItem<CommentWithUserData>>(({ item }) => {
        return <CommentCard commentWithUserData={item} />
    }, [])

    return (
        <View style={styles.wrapper}>
            <View style={globalStyles.flexRow}>
                <IconButton
                    size={12}
                    icon='arrow-left'
                    mode='outlined'
                    onPress={onClose}
                />
                <Text style={styles.subtitle}>Kommentare</Text>
            </View>
            <FlatList<CommentWithUserData>
                data={comments}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={() => (
                    <View style={styles.empty}>
                        <Text>Keine Kommentare</Text>
                    </View>
                )}
                contentContainerStyle={styles.contentContainer}
            />
            <ChatInput
                onSend={onSend}
                disabled={isNil(session)}
                pending={creatingComment}
            />
        </View>
    )
}

export default ProblemComments
