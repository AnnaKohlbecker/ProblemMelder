import { useCallback, useEffect } from 'react'
import { Alert, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { useDeleteProblemMutation } from '~/queries/Problems/useDeleteProblemMutation'
import { useProblemsQuery } from '~/queries/Problems/useProblemsQuery'
import { useUserByIdQuery } from '~/queries/Users/useUserByIdQuery'
import Header from '~/shared/components/Header'
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

    const { mutate: deleteProblem, isPending: isDeletingProblem } = useDeleteProblemMutation()

    const onDelete = useCallback(
        (problem: Problem) => {
            showDialog({
                title: problem.title,
                description: problem.id.toString(),
                onAccept: () => {
                    try {
                        deleteProblem(problem)
                        Alert.alert(
                            'Success',
                            `Problem with id ${problem.id} has been deleted successfully.`,
                        )
                        refetchProblems()
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
        [deleteProblem, refetchProblems, showDialog],
    )

    useEffect(() => {
        if (!userError && !problemsError) return

        Alert.alert('Error')
    }, [userError, problemsError])

    if (userLoading || problemsLoading || isDeletingProblem) return <LoadingSpinner />

    return (
        <View style={globalStyles.flexBox}>
            <Header />
            <View style={globalStyles.container}>
                <Text style={globalStyles.title}>Profil</Text>
                <Text>
                    Rolle: {role} ({user?.role})
                </Text>
                <Text>Punkte: {user?.points}</Text>
                {problems && problems.length > 0 && (
                    <Button onPress={() => onDelete(problems[0])}>
                        Problem "{problems[0].title}" mit der Id "{problems[0].id}" löschen
                    </Button>
                )}
            </View>
            {/* <View>
                {showButton && (
                    <SegmentedButtons
                        value={lectureView}
                        onValueChange={(value) => setLectureView(value as LectureType)}
                        buttons={buttons}
                        style={globalStyles.segmentedButtons}
                        theme={theme}
                    />
                )}
                <Searchbar
                    style={globalStyles.searchbar}
                    value={search}
                    onChangeText={setSearch}
                    placeholder={intl.formatMessage(translations.search)}
                />
            </View>
            {searchedLectures.length === 0 ? (
                <View style={globalStyles.noDataContainer}>
                    <Text style={globalStyles.noDataText}>
                        {intl.formatMessage(translations.noData)}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={searchedLectures}
                    keyExtractor={(lecture) => lecture.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={
                        showButton ? globalStyles.listSection : styles.listSection
                    }
                />
            )} */}
        </View>
    )
}
export default Profile
