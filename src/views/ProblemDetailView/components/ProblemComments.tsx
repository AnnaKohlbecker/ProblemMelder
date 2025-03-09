import { isNil } from 'lodash'
import { useCallback } from 'react'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { useCreateProblemCommentMutation } from '~/queries/ProblemComments/useCreateProblemCommentMutation'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'
import { useKeyboard } from '~/shared/context/KeyboardContext'
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
    smallCommentsContainer: {
        padding: 10,
        backgroundColor: colors.tertiary,
        gap: 10,
        minHeight: 130,
        borderRadius: 10,
    },
    bigCommentsContainer: {
        padding: 10,
        backgroundColor: colors.tertiary,
        gap: 10,
        minHeight: 430,
        borderRadius: 10,
    },
    bigWrapper: {
        maxHeight: '80%',
        minHeight: 600,
        gap: 15,
    },
    smallWrapper: {
        maxHeight: '80%',
        minHeight: 300,
        gap: 15,
    },
})

const ProblemComments = ({ problem, comments, onSend: onSendProp, onClose }: Props) => {
    const { session } = useAuth()
    const { isKeyboardVisible } = useKeyboard()

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
        <View style={isKeyboardVisible ? styles.smallWrapper : styles.bigWrapper}>
            <View style={globalStyles.flexRow}>
                <IconButton
                    size={20}
                    icon='arrow-left'
                    mode='outlined'
                    onPress={onClose}
                    iconColor={colors.primary}
                />
                <Text style={globalStyles.subtitle}>Kommentare</Text>
            </View>
            <FlatList<CommentWithUserData>
                data={comments}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={
                    isKeyboardVisible ? styles.smallCommentsContainer : styles.bigCommentsContainer
                }
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
