import * as Location from 'expo-location'
import { useCallback, useEffect, useState } from 'react'
import { Alert, FlatList, StyleSheet, View } from 'react-native'
import { FAB, Searchbar } from 'react-native-paper'
import { BaseRoute } from 'react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation'
import { useImageByNameQuery } from '~/queries/Problems/useImageByNameQuery'
import { useProblemsQuery } from '~/queries/Problems/useProblemsQuery'
import { useUserByIdQuery } from '~/queries/Users/useUserByIdQuery'
import Filter from '~/shared/components/Filter'
import Header from '~/shared/components/Header'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'
import { DisplayedProblem } from '~/shared/models/DisplayedProblems'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import ProblemReport from '~/views/ProblemReport'
import ProblemCard from '~/views/Problems/components/ProblemCard'
import { useProblemsFilterLogic } from '~/views/Problems/hooks/useProblemFilterLogic'
import { useProblemsSearchLogic } from '~/views/Problems/hooks/useProblemsSearchLogic'

type Props = {
    route: BaseRoute
}

const styles = StyleSheet.create({
    listFooterComponent: {
        padding: 35,
    },
    searchAndFilterContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    searchBar: {
        backgroundColor: colors.gray,
        flex: 1,
    },
})

const Problems = ({ route }: Props) => {
    const { session } = useAuth()
    const [displayedProblems, setDisplayedProblems] = useState<DisplayedProblem[]>([])
    const [displayedProblemsLoading, setDisplayedProblemsLoading] = useState<boolean>(true)
    const [reportProblem, setReportProblem] = useState(false)

    const { isLoading: userLoading, error: userError } = useUserByIdQuery({
        userId: session?.user.id,
    })
    const {
        data: problems,
        isLoading: problemsLoading,
        error: problemsError,
        refetch: refetchProblems,
    } = useProblemsQuery()
    const { data: imageUris } = useImageByNameQuery({ problems })

    const { searchedProblems, search, setSearch } = useProblemsSearchLogic({
        problems: displayedProblems ?? [],
    })

    const { filteredProblems, filter, setFilter } = useProblemsFilterLogic({
        problems: displayedProblems ?? [],
    })

    const searchedAndFilteredProblems = filteredProblems.filter((problem) =>
        searchedProblems.some((searchedProblem) => searchedProblem.id === problem.id),
    )

    const onReportProblem = useCallback(() => {
        setReportProblem(true)
    }, [])

    const onClose = useCallback(() => {
        setReportProblem(false)
    }, [])

    useEffect(() => {
        if (!problems) return

        const fetch = async () => {
            const updatedProblems = await Promise.all(
                problems.map(async (problem) => {
                    let address = 'Unknown Location'
                    if (problem.location) {
                        const [latitude, longitude] = problem.location.split(',').map(Number)
                        const [location] = await Location.reverseGeocodeAsync({
                            latitude,
                            longitude,
                        })
                        address =
                            location?.formattedAddress ??
                            `${location.street ?? ''}, ${location.city ?? ''}, ${location.country ?? ''}`
                    }

                    return {
                        ...problem,
                        address,
                        imageUri:
                            imageUris?.find(
                                (imageUri) => Object.keys(imageUri)[0] === problem.image,
                            )?.[problem.image] || '',
                        formattedDate: new Date(problem.date).toLocaleDateString('de-DE'),
                    }
                }),
            )

            setDisplayedProblems(updatedProblems)
        }

        fetch()
        setDisplayedProblemsLoading(false)
    }, [problems, imageUris])

    useEffect(() => {
        if (userError || problemsError) {
            Alert.alert('Error', 'An error occurred while fetching data.')
        }
    }, [userError, problemsError])

    if (reportProblem) return <ProblemReport onClose={onClose} />

    if (userLoading || problemsLoading || displayedProblemsLoading) return <LoadingSpinner />

    return (
        <View style={globalStyles.flexBox}>
            <Header route={route} />
            <View style={styles.searchAndFilterContainer}>
                <Searchbar
                    style={styles.searchBar}
                    value={search}
                    onChangeText={setSearch}
                    placeholder='Suche'
                />
                <Filter
                    value={filter}
                    onChangeFilter={setFilter}
                />
            </View>
            <FlatList
                data={searchedAndFilteredProblems}
                style={globalStyles.flatList}
                renderItem={({ item: problem }) => <ProblemCard problem={problem} />}
                ListFooterComponent={<View style={styles.listFooterComponent} />}
                onEndReached={() => {
                    if (!problemsLoading) {
                        refetchProblems()
                    }
                }}
            />
            <FAB
                icon='plus'
                onPress={onReportProblem}
                style={globalStyles.fab}
            />
        </View>
    )
}

export default Problems
