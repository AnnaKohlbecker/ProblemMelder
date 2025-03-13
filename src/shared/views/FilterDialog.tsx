import { isNil } from 'lodash'
import { useCallback, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { Button, Dialog, IconButton, Portal, Text } from 'react-native-paper'
import { useCategoriesQuery } from '~/queries/Categories/useCategoriesQuery'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useLocation } from '~/shared/context/LocationContext'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { useInRadiusLogic } from '~/shared/hooks/useInRadiusLogic'
import { ProblemFilterFormData } from '~/shared/types/Filter'
import SelectMenu from '~/shared/views/Inputs/SelectMenu'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import { Problem } from '~/supabase/types'

type Props = {
    problems: Problem[]
    onClose: () => void
    setFilteredProblems: (filtered: Problem[]) => void
    filterValues: ProblemFilterFormData
    setFilterValues: (values: ProblemFilterFormData) => void
}

const styles = StyleSheet.create({
    content: {
        gap: 20,
        marginTop: 15,
    },
})

const FilterDialog = ({
    problems,
    onClose,
    setFilteredProblems,
    filterValues,
    setFilterValues,
}: Props) => {
    const location = useLocation()
    const { isInRadius } = useInRadiusLogic()
    const { data: categories, isLoading: categoriesLoading } = useCategoriesQuery()
    const hasLocation = useMemo(() => !isNil(location), [location])

    const statusOptions = [
        { label: 'Kein Filter', value: -2 },
        { label: 'Deaktiviert', value: ProblemStatus.Cancelled },
        { label: 'Zu Erledigen', value: ProblemStatus.ToDo },
        { label: 'In Bearbeitung', value: ProblemStatus.InProgress },
        { label: 'Erledigt', value: ProblemStatus.Done },
    ]

    const categoriesOptions = isNil(categories)
        ? [{ label: 'Kein Filter', value: -2 }]
        : [
              { label: 'Kein Filter', value: -2 },
              ...categories.map((c) => ({
                  label: c.title,
                  value: c.id,
              })),
          ]

    const radiusOptions = [
        { label: 'Kein Filter', value: -2 },
        { label: '1 km', value: 1 },
        { label: '5 km', value: 5 },
        { label: '10 km', value: 10 },
    ]

    const form = useForm<ProblemFilterFormData>({
        defaultValues: filterValues,
    })

    const { handleSubmit, reset } = form

    const onSubmit = useCallback(
        (data: ProblemFilterFormData) => {
            const filtered = problems.filter((problem) => {
                const statusMatch =
                    isNil(data.status) || data.status === -2 || problem.status === data.status
                const categoryMatch =
                    isNil(data.categoryId) ||
                    data.categoryId === -2 ||
                    problem.categoryId === data.categoryId
                const noRadiusSet = isNil(data.radius) || data.radius === -2
                const [problemLatitude, problemLongitude] = problem.location.split(',').map(Number)
                const radiusMatch =
                    noRadiusSet || isInRadius(problemLatitude, problemLongitude, data.radius)

                return statusMatch && categoryMatch && radiusMatch
            })
            setFilterValues(data)
            setFilteredProblems(filtered)
            onClose()
        },
        [problems, setFilteredProblems, onClose, isInRadius, setFilterValues],
    )

    const onReset = useCallback(() => {
        const defaultValues: ProblemFilterFormData = {
            status: -2,
            categoryId: -2,
            radius: -2,
        }
        reset(defaultValues)
        setFilterValues(defaultValues)
        setFilteredProblems(problems)
    }, [reset, setFilterValues, setFilteredProblems, problems])

    if (categoriesLoading) return <LoadingSpinner />

    return (
        <Portal>
            <Dialog
                visible={true}
                onDismiss={onClose}
                style={globalStyles.dialog}
            >
                <FormProvider {...form}>
                    <Dialog.Content style={styles.content}>
                        <View style={globalStyles.cardHeader}>
                            <Text style={globalStyles.cardHeaderTitle}>Filter</Text>
                            <View style={globalStyles.cardHeaderButtons}>
                                <IconButton
                                    icon='close'
                                    onPress={onClose}
                                    mode='contained'
                                />
                            </View>
                        </View>
                        <SelectMenu
                            label='Status'
                            name='status'
                            options={statusOptions}
                        />
                        <SelectMenu
                            label='Kategorie'
                            name='categoryId'
                            options={categoriesOptions}
                        />
                        <SelectMenu
                            label={isNil(hasLocation) ? 'Standort nicht gefunden' : 'Umkreis'}
                            name='radius'
                            disabled={isNil(hasLocation)}
                            options={radiusOptions}
                        />
                    </Dialog.Content>
                    <Dialog.Actions style={globalStyles.flexRowWithSpace}>
                        <Button onPress={onReset}>Zurücksetzen</Button>
                        <Button onPress={handleSubmit(onSubmit)}>Speichern</Button>
                    </Dialog.Actions>
                </FormProvider>
            </Dialog>
        </Portal>
    )
}

export default FilterDialog
