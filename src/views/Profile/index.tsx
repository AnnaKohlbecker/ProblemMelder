import { useCallback, useEffect } from 'react'
import { Alert, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { useDeleteProblemMutation } from '~/queries/Problem/useDeleteProblemMutation'
import { useProblemsQuery } from '~/queries/Problem/useProblemsQuery'
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

    const { mutate: deleteProblem } = useDeleteProblemMutation()

    const onDelete = useCallback(
        (problem: Problem) => {
            showDialog({
                title: 'Problem Löschen',
                description: 'Problem Titel: ' + problem.title,
                onAccept: () =>
                    deleteProblem(problem.id, {
                        onSuccess: () => {
                            refetchProblems()
                            Alert.alert('Erfolg', 'Das Problem wurde erfolgreich gelöscht.')
                        },
                        onError: (error) => {
                            Alert.alert('Fehler', error.message)
                        },
                    }),
            })
        },
        [deleteProblem, refetchProblems, showDialog],
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
                <Button onPress={() => onDelete(problems[0])}>Problem Löschen</Button>
            )}
        </View>
    )
}
export default Profile
