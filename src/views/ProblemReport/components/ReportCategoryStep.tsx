import { useCallback } from 'react'
import { useController } from 'react-hook-form'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { Card, Icon, Text, TouchableRipple } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { useProblemCategoriesQuery } from '~/queries/ProblemCategories/useProblemCategoriesQuery'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { ProblemCategory } from '~/shared/models/ProblemCategory'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import { ReportStepProps } from '~/views/ProblemReport/types/ReportStepProps'

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 10,
        margin: 10,
    },
    cardContent: {
        aspectRatio: 1,
        borderRadius: 10,
        height: RFValue(80),
        width: RFValue(80),
    },
    cardWrapper: {
        alignItems: 'center',
        flex: 1,
        gap: 5,
        justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
    },
    current: {
        backgroundColor: colors.secondary,
    },
    error: {
        color: colors.primary,
    },
    header: {
        margin: 10,
    },
    subtitle: {
        fontSize: RFValue(10),
        fontWeight: 'bold',
        textAlign: 'center',
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
            <Card style={[styles.card, value === item.id ? styles.current : undefined]}>
                <TouchableRipple
                    key={item.id}
                    borderless={true}
                    onPress={onPress(item)}
                    style={styles.cardContent}
                >
                    <View style={styles.cardWrapper}>
                        <Icon
                            size={36}
                            source={item.icon}
                            color={colors.primary}
                        />
                        <Text style={styles.subtitle}>{item.title}</Text>
                    </View>
                </TouchableRipple>
            </Card>
        ),
        [onPress, value],
    )

    return (
        <View style={globalStyles.flexBox}>
            <View style={styles.header}>
                {error && <Text style={styles.error}>{error.message}</Text>}
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
