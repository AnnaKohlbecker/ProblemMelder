import { isNil } from 'lodash'
import { useCallback } from 'react'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { useCreateProblemCommentMutation } from '~/queries/ProblemComments/useCreateProblemCommentMutation'
import { useAuth } from '~/shared/context/AuthContext'
import { Problem } from '~/shared/models/Problem'
import { CommentWithUserData } from '~/shared/types/CommentWithUserData'
import ChatInput from '~/shared/views/Inputs/ChatInput'
import CommentCard from '~/views/ProblemDetailView/components/CommentCard'

type Props = {
    problem: Problem
    comments: CommentWithUserData[]
    onSend: () => void
}

const styles = StyleSheet.create({
    contentContainer: {
        gap: 10,
    },
    wrapper: {
        maxHeight: '80%',
        minHeight: 200,
    },
})

const ProblemComments = ({ problem, comments, onSend: onSendProp }: Props) => {
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
        <>
            <View style={styles.wrapper}>
                <FlatList<CommentWithUserData>
                    data={comments}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.contentContainer}
                />
            </View>
            <ChatInput
                onSend={onSend}
                disabled={isNil(session)}
                pending={creatingComment}
            />
        </>
    )
}

export default ProblemComments
