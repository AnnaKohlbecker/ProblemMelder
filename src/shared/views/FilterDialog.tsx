import { isNil } from 'lodash'
import { useCallback, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { Button, Dialog, IconButton, Portal, Text } from 'react-native-paper'
import { useCategoriesQuery } from '~/queries/Categories/useCategoriesQuery'
import { globalStyles } from '~/shared/constants/globalStyles'
import { radiusOptions } from '~/shared/constants/radiusOptions'
import { statusOptions } from '~/shared/constants/statusOptions'
import { useLocation } from '~/shared/context/LocationContext'
import { FilterStatus } from '~/shared/enums/FilterStatus'
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

    const categoriesOptions = useMemo(() => {
        return isNil(categories)
            ? [{ label: 'Kein Filter', value: FilterStatus.Inactive }]
            : [
                  { label: 'Kein Filter', value: FilterStatus.Inactive },
                  ...categories.map((c) => ({
                      label: c.title,
                      value: c.id,
                  })),
              ]
    }, [categories])

    const form = useForm<ProblemFilterFormData>({
        defaultValues: filterValues,
    })

    const { handleSubmit, reset } = form

    const onSubmit = useCallback(
        (data: ProblemFilterFormData) => {
            const filtered = problems.filter((problem) => {
                const statusMatch =
                    isNil(data.status) ||
                    data.status === FilterStatus.Inactive ||
                    problem.status === data.status
                const categoryMatch =
                    isNil(data.categoryId) ||
                    data.categoryId === FilterStatus.Inactive ||
                    problem.categoryId === data.categoryId
                const noRadiusSet = isNil(data.radius) || data.radius === FilterStatus.Inactive
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
            status: FilterStatus.Inactive,
            categoryId: FilterStatus.Inactive,
            radius: FilterStatus.Inactive,
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
