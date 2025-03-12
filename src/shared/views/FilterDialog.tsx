import { isNil } from 'lodash'
import { useCallback, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import { Button, Dialog, Portal } from 'react-native-paper'
import { useCategoriesQuery } from '~/queries/Categories/useCategoriesQuery'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useLocation } from '~/shared/context/LocationContext'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { useInRadiusLogic } from '~/shared/hooks/useInRadiusLogic'
import SelectMenu from '~/shared/views/Inputs/SelectMenu'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import { Problem } from '~/supabase/types'

type ProblemFilterFormData = Omit<Problem, 'id'> & {
    id?: number
    radius: number
}

type Props = {
    problems: Problem[]
    onClose: () => void
    setFilteredProblems: (filtered: Problem[]) => void
}

const styles = StyleSheet.create({
    content: {
        gap: 20,
    },
})

const FilterDialog = ({ problems, onClose, setFilteredProblems }: Props) => {
    const location = useLocation()
    const { isInRadius } = useInRadiusLogic()
    const { data: categories, isLoading: categoriesLoading } = useCategoriesQuery()
    const hasLocation = useMemo(() => !isNil(location), [location])

    const statusOptions = [
        { label: '/', value: -2 },
        { label: 'Zu Erledigen', value: ProblemStatus.ToDo },
        { label: 'In Bearbeitung', value: ProblemStatus.InProgress },
        { label: 'Erledigt', value: ProblemStatus.Done },
    ]

    const categoriesOptions = isNil(categories)
        ? [{ label: '/', value: -2 }]
        : [
              { label: '/', value: -2 },
              ...categories.map((c) => ({
                  label: c.title,
                  value: c.id,
              })),
          ]

    const radiusOptions = [
        { label: '/', value: -2 },
        { label: '1 km', value: 1 },
        { label: '5 km', value: 5 },
        { label: '10 km', value: 10 },
    ]

    const form = useForm<ProblemFilterFormData>()

    const { handleSubmit } = form

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
            setFilteredProblems(filtered)
            onClose()
        },
        [problems, setFilteredProblems, onClose, isInRadius],
    )

    if (categoriesLoading) return <LoadingSpinner />

    return (
        <Portal>
            <Dialog
                visible={true}
                onDismiss={onClose}
                style={globalStyles.dialog}
            >
                <FormProvider {...form}>
                    <Dialog.Title>Filter</Dialog.Title>
                    <Dialog.Content style={styles.content}>
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
                    <Dialog.Actions>
                        <Button onPress={onClose}>Abbrechen</Button>
                        <Button onPress={handleSubmit(onSubmit)}>Speichern</Button>
                    </Dialog.Actions>
                </FormProvider>
            </Dialog>
        </Portal>
    )
}

export default FilterDialog
