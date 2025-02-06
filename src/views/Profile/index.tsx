import { Route } from '@react-navigation/native'
import { useCallback, useMemo } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { Button, Card, Text } from 'react-native-paper'
import { useDeleteProblemMutation } from '~/queries/Problems/useDeleteProblemMutation'
import { useProblemsQuery } from '~/queries/Problems/useProblemsQuery'
import { useUserByIdQuery } from '~/queries/UserData/useUserByIdQuery'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'
import { useDialog } from '~/shared/context/DialogContext'
import { Route as RouteEnum } from '~/shared/enums/Route'
import { Problem } from '~/shared/models/Problem'
import Header from '~/shared/views/Header'
import LoadingSpinner from '~/shared/views/LoadingSpinner'

type Props = {
    route: Route<RouteEnum>
}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
})

const Profile = ({ route }: Props) => {
    const { session, role } = useAuth()
    const showDialog = useDialog()

    const { data: user, isLoading: userLoading } = useUserByIdQuery({ userId: session?.user.id })

    const {
        data: problems,
        isLoading: problemsLoading,
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

    return userLoading || problemsLoading || isDeletingProblem ? (
        <LoadingSpinner />
    ) : (
        <View style={globalStyles.flexBox}>
            <Header route={route} />
            <View style={styles.wrapper}>
                <Card style={globalStyles.card}>
                    <Card.Title title='Rolle' />
                    <Card.Content>
                        <Text variant='bodyLarge'>{role?.displayName}</Text>
                    </Card.Content>
                </Card>
                <Card style={globalStyles.card}>
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
