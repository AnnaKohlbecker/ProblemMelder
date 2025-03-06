import { isNil } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { FlatList, Keyboard, ListRenderItem, StyleSheet, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { useCreateProblemCommentMutation } from '~/queries/ProblemComments/useCreateProblemCommentMutation'
import { colors } from '~/shared/constants/colors'
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
    commentsContainer: {
        backgroundColor: colors.tertiary,
        gap: 10,
    },
    bigWrapper: {
        maxHeight: '80%',
        minHeight: 550,
        gap: 15,
    },
    smallWrapper: {
        maxHeight: '80%',
        minHeight: 300,
        gap: 15,
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

const ProblemComments = ({ problem, comments, onSend: onSendProp, onClose }: Props) => {
    const { session } = useAuth()
    const [isKeyboardVisible, setKeyboardVisible] = useState(false)

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

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true)
        })

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false)
        })

        return () => {
            keyboardDidShowListener.remove()
            keyboardDidHideListener.remove()
        }
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
                ListEmptyComponent={() => (
                    <View style={styles.empty}>
                        <Text>Keine Kommentare</Text>
                    </View>
                )}
                contentContainerStyle={styles.commentsContainer}
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
