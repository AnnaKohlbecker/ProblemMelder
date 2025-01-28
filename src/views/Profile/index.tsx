import { useCallback, useEffect } from 'react'
import { Alert, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { useDeleteProblemMutation } from '~/queries/Problems/useDeleteProblemMutation'
import { useProblemsQuery } from '~/queries/Problems/useProblemsQuery'
import { useUserByIdQuery } from '~/queries/Users/useUserByIdQuery'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'
import { useDialog } from '~/shared/context/DialogContext'
import { Problem } from '~/shared/types/Problem'
import LoadingSpinner from '~/shared/views/LoadingSpinner'

const Profile = () => {
    const { session, role } = useAuth()
    const showDialog = useDialog()

    const {
        data: user,
        isLoading: userLoading,
        error: userError,
    } = useUserByIdQuery({ userId: session?.user.id })

    const {
        data: problems,
        isLoading: problemsLoading,
        error: problemsError,
        refetch: refetchProblems,
    } = useProblemsQuery()

    const deleteProblem = useDeleteProblemMutation() as ReturnType<typeof useDeleteProblemMutation>

    const onDelete = useCallback(
        (problem: Problem) => {
            showDialog({
                title: problem.title,
                description: problem.id.toString(),
                onAccept: async () => {
                    try {
                        await deleteProblem(problem.id)
                        refetchProblems()
                        Alert.alert(
                            'Success',
                            `Problem with id ${problem.id} has been deleted successfully.`,
                        )
                    } catch (error) {
                        if (error instanceof Error) {
                            Alert.alert('Error', error.message)
                        } else {
                            Alert.alert('Error', 'An unknown error occurred')
                        }
                    }
                },
            })
        },
        [showDialog, deleteProblem, refetchProblems],
    )

    useEffect(() => {
        if (!userError && !problemsError) return

        Alert.alert('Error')
    }, [userError, problemsError])

    if (userLoading || problemsLoading) return <LoadingSpinner />

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Profil</Text>
            <Text>Rolle: {role}</Text>
            <Text>Punkte: {user?.points}</Text>
            {problems && problems.length > 0 && (
                <Button onPress={() => onDelete(problems[0])}>
                    Problem "{problems[0].title}" mit der Id "{problems[0].id}" löschen
                </Button>
            )}
        </View>
    )
}
export default Profile
