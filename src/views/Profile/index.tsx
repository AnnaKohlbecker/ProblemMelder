import { Route } from '@react-navigation/native'
import { useCallback, useMemo } from 'react'
import { Alert, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { useDeleteProblemMutation } from '~/queries/Problems/useDeleteProblemMutation'
import { useProblemsQuery } from '~/queries/Problems/useProblemsQuery'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useDialog } from '~/shared/context/DialogContext'
import { Route as RouteEnum } from '~/shared/enums/Route'
import Header from '~/shared/views/Header'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import { Problem } from '~/supabase/types'
import ProfileHeader from '~/views/Profile/components/ProfileHeader'

type Props = {
    route: Route<RouteEnum>
}

const Profile = ({ route }: Props) => {
    const showDialog = useDialog()

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

    return (
        <View style={globalStyles.flexBoxWithColor}>
            <Header route={route} />
            {problemsLoading || isDeletingProblem ? (
                <LoadingSpinner />
            ) : (
                <>
                    <ProfileHeader />
                    {problems && problems.length > 0 ? (
                        <Button
                            onPress={() => {
                                onDelete(problems[0])
                            }}
                        >
                            {deleteButtonText}
                        </Button>
                    ) : (
                        <Text>{deleteButtonText}</Text>
                    )}
                </>
            )}
        </View>
    )
}
export default Profile
