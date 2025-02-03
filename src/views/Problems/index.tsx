import * as Location from 'expo-location'
import { isNil } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, FlatList, View } from 'react-native'
import { FAB, Searchbar } from 'react-native-paper'
import { BaseRoute } from 'react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation'
import { useProblemsQuery } from '~/queries/Problems/useProblemsQuery'
import { useUserByIdQuery } from '~/queries/Users/useUserByIdQuery'
import Filter from '~/shared/components/Filter'
import Header from '~/shared/components/Header'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useAuth } from '~/shared/context/AuthContext'
import { getImagePath } from '~/shared/helpers/getImagePath'
import { DisplayedProblem } from '~/shared/models/DisplayedProblems'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import ProblemReport from '~/views/ProblemReport'
import ProblemCard from '~/views/Problems/components/ProblemCard'
import { useProblemsFilterLogic } from '~/views/Problems/hooks/useProblemFilterLogic'
import { useProblemsSearchLogic } from '~/views/Problems/hooks/useProblemsSearchLogic'

type Props = {
    route: BaseRoute
}

const Problems = ({ route }: Props) => {
    const { session } = useAuth()
    const [displayedProblems, setDisplayedProblems] = useState<DisplayedProblem[]>([])
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

    const { searchedProblems, search, setSearch } = useProblemsSearchLogic({
        problems: displayedProblems ?? [],
    })

    const { filteredProblems, filter, setFilter } = useProblemsFilterLogic({
        problems: displayedProblems ?? [],
    })

    const searchedAndFilteredProblems = useMemo(() => {
        return filteredProblems.filter((problem) =>
            searchedProblems.some((searchedProblem) => searchedProblem.id === problem.id),
        )
    }, [filteredProblems, searchedProblems])

    const onReportProblem = useCallback(() => {
        setReportProblem(true)
    }, [])

    const onClose = useCallback(() => {
        setReportProblem(false)
    }, [])

    useEffect(() => {
        if (!problems) return

        problems.forEach((problem) => {
            if (isNil(problem.location)) {
                // eslint-disable-next-line no-console
                console.warn('Location is missing for problem with id: ' + problem.id)
                return
            }

            const [latitude, longitude] = problem.location.split(',').map(Number)

            Location.reverseGeocodeAsync({
                latitude,
                longitude,
            }).then(([location]) => {
                const address =
                    location.formattedAddress ??
                    `${location.street ?? ''}, ${location.city ?? ''}, ${location.country ?? ''}`

                setDisplayedProblems((problems) => {
                    return [
                        ...problems,
                        {
                            ...problem,
                            address,
                            imageUri: getImagePath(problem.image),
                            formattedDate: new Date(problem.date).toLocaleDateString('de-DE'),
                        },
                    ]
                })
            })
        })
    }, [problems])

    useEffect(() => {
        if (userError || problemsError) {
            Alert.alert('Error', 'An error occurred while fetching data.')
        }
    }, [userError, problemsError])

    if (reportProblem) return <ProblemReport onClose={onClose} />

    if (userLoading || problemsLoading) return <LoadingSpinner />

    return (
        <View style={globalStyles.flexBox}>
            <Header route={route} />
            <View style={globalStyles.searchAndFilterContainer}>
                <Searchbar
                    style={globalStyles.searchBar}
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
                keyExtractor={(problem) => problem.id.toString()}
                renderItem={({ item: problem }) => <ProblemCard problem={problem} />}
                ListFooterComponent={<View style={globalStyles.flatListFooterComponent} />}
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
