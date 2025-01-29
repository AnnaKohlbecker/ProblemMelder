import { useCallback, useEffect, useMemo } from 'react'
import { Alert, View } from 'react-native'
import { Button, Card, Text } from 'react-native-paper'
import { BaseRoute } from 'react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation'
import { useDeleteProblemMutation } from '~/queries/Problems/useDeleteProblemMutation'
import { useProblemsQuery } from '~/queries/Problems/useProblemsQuery'
import { useUserByIdQuery } from '~/queries/Users/useUserByIdQuery'
import Header from '~/shared/components/Header'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'
import { useDialog } from '~/shared/context/DialogContext'
import { Problem } from '~/shared/models/Problem'
import LoadingSpinner from '~/shared/views/LoadingSpinner'

type Props = {
    route: BaseRoute
}

const Profile = ({ route }: Props) => {
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

    const { mutate: deleteProblem, isPending: isDeletingProblem } = useDeleteProblemMutation()

    const onDelete = useCallback(
        (problem: Problem) => {
            showDialog({
                title: problem.title,
                description: problem.id.toString(),
                onAccept: () => {
                    deleteProblem(problem, {
                        onSuccess: () => {
                            Alert.alert(
                                `Problem mit der Id ${problem.id} wurde erfolgreich gelöscht.`,
                            )
                            refetchProblems()
                        },
                    })
                },
            })
        },
        [deleteProblem, refetchProblems, showDialog],
    )

    const deleteButtonText = useMemo(() => {
        return problems && problems.length > 0
            ? `Problem "${problems[0].title}" mit der Id "${problems[0].id}" löschen`
            : 'Keine Probleme vorhanden.'
    }, [problems])

    useEffect(() => {
        if (!userError && !problemsError) return

        Alert.alert('Fehler', 'Ein unerwarteter Fehler ist aufgetreten.')
        // eslint-disable-next-line no-console
        console.error(userError ?? problemsError)
    }, [userError, problemsError])

    return userLoading || problemsLoading || isDeletingProblem ? (
        <LoadingSpinner />
    ) : (
        <View style={globalStyles.flexBox}>
            <Header route={route} />
            <View style={globalStyles.card}>
                <Card>
                    <Card.Title title='Rolle' />
                    <Card.Content>
                        <Text variant='bodyLarge'>{role}</Text>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Title title='Punkte' />
                    <Card.Content>
                        <Text variant='bodyLarge'>{user?.points}</Text>
                    </Card.Content>
                </Card>
                {problems && problems.length > 0 ? (
                    <Button onPress={() => onDelete(problems[0])}>{deleteButtonText}</Button>
                ) : (
                    <Text>{deleteButtonText}</Text>
                )}
            </View>
        </View>
    )
}
export default Profile
