import { useCallback } from 'react'
import { useController } from 'react-hook-form'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useProblemCategoriesQuery } from '~/queries/ProblemCategories/useProblemCategoriesQuery'
import { globalStyles } from '~/shared/constants/globalStyles'
import { ProblemCategory } from '~/shared/models/ProblemCategory'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import ReportCategoryCard from '~/views/ProblemReport/components/ReportCategoryCard'
import { ReportStepProps } from '~/views/ProblemReport/types/ReportStepProps'

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    header: {
        margin: 10,
    },
})

const ReportCategoryStep = ({ isLoading }: ReportStepProps) => {
    const { data: categories, isLoading: categoriesLoading } = useProblemCategoriesQuery()

    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({
        name: 'categoryId',
        rules: {
            required: 'Bitte wähle eine Kategorie aus.',
        },
    })

    const {
        field: { onChange: setAcademyId },
    } = useController({ name: 'authorityId' })

    const onPress = useCallback(
        (category: ProblemCategory) => () => {
            onChange(category.id)
            setAcademyId(category.authorityId)
        },
        [onChange, setAcademyId],
    )

    const renderItem = useCallback<ListRenderItem<ProblemCategory>>(
        ({ item }) => (
            <ReportCategoryCard
                item={item}
                selected={item.id === value}
                onPress={onPress(item)}
            />
        ),
        [onPress, value],
    )

    return (
        <View style={globalStyles.flexBox}>
            <View style={styles.header}>
                {error && <Text style={globalStyles.error}>{error.message}</Text>}
            </View>
            {isLoading || categoriesLoading ? (
                <LoadingSpinner />
            ) : (
                <View style={styles.container}>
                    <FlatList<ProblemCategory>
                        data={categories}
                        renderItem={renderItem}
                        numColumns={3}
                    />
                </View>
            )}
        </View>
    )
}
export default ReportCategoryStep
