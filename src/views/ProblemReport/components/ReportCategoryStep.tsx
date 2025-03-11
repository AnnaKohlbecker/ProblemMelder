import { useCallback } from 'react'
import { useController } from 'react-hook-form'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useCategoriesQuery } from '~/queries/Categories/useCategoriesQuery'
import { globalStyles } from '~/shared/constants/globalStyles'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import { Category } from '~/supabase/types'
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
    const { data: categories, isLoading: categoriesLoading } = useCategoriesQuery()

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
        (category: Category) => () => {
            onChange(category.id)
            setAcademyId(category.authorityId)
        },
        [onChange, setAcademyId],
    )

    const renderItem = useCallback<ListRenderItem<Category>>(
        ({ item }) => (
            <ReportCategoryCard
                item={item}
                selected={item.id === value}
                onPress={onPress(item)}
            />
        ),
        [onPress, value],
    )

    if (isLoading || categoriesLoading) return <LoadingSpinner />

    return (
        <View style={globalStyles.flexBox}>
            <View style={styles.header}>
                {error && <Text style={globalStyles.error}>{error.message}</Text>}
            </View>
            <View style={styles.container}>
                <FlatList<Category>
                    data={categories}
                    renderItem={renderItem}
                    numColumns={3}
                />
            </View>
        </View>
    )
}
export default ReportCategoryStep
