import { ParamListBase, Route, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { isNil } from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { FAB } from 'react-native-paper'
import { useAuthoritiesQuery } from '~/queries/Authorities/useAuthoritiesQuery'
import { useCategoriesQuery } from '~/queries/Categories/useCategoriesQuery'
import { useDeleteCategoryMutation } from '~/queries/Categories/useDeleteCategoryMutation'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useDialog } from '~/shared/context/DialogContext'
import { useSnackbar } from '~/shared/context/SnackbarContext'
import { Route as RouteEnum } from '~/shared/enums/Route'
import Header from '~/shared/views/Header'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import { Category } from '~/supabase/types'
import AddOrEditCategoryModal from '~/views/Management/Categories/components/AddOrEditCategoryModal'
import CategoryListItem from '~/views/Management/Categories/components/CategoryListItem'

type Props = {
    route: Route<RouteEnum>
}

const styles = StyleSheet.create({
    list: {
        paddingVertical: 10,
    },
})

const CategoriesManagement = ({ route }: Props) => {
    const showDialog = useDialog()
    const showSnackbar = useSnackbar()

    const [editInfo, setEditInfo] = useState<{ editInfo?: Category }>()

    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()

    const { mutate: deleteCategory } = useDeleteCategoryMutation()
    const {
        data: categories,
        isLoading: categoriesLoading,
        refetch: refetchCategories,
    } = useCategoriesQuery()

    const { data: authorities, isLoading: authoritiesLoading } = useAuthoritiesQuery()

    const onClose = useCallback(() => {
        navigate(RouteEnum.MANAGEMENT)
    }, [navigate])

    const onAdd = useCallback(() => {
        setEditInfo({})
    }, [])

    const onEdit = useCallback((category: Category) => {
        setEditInfo({ editInfo: category })
    }, [])

    const onDelete = useCallback(
        (category: Category) => {
            if (isNil(category.id)) return

            showDialog({
                title: 'Kategorie löschen?',
                description:
                    'Möchtest du diese Kategorie wirklich löschen? Diese Änderung kann nicht Rückgängig gemacht werden.',
                onAccept: () => {
                    deleteCategory(category.id)
                    refetchCategories()
                    showSnackbar('Die Kategorie wurde erfolgreich gelöscht.')
                },
            })
        },
        [deleteCategory, refetchCategories, showDialog, showSnackbar],
    )

    const loading = useMemo(
        () => categoriesLoading || authoritiesLoading,
        [categoriesLoading, authoritiesLoading],
    )

    if (loading) return <LoadingSpinner />

    return (
        <View style={globalStyles.flexBoxWithColor}>
            <Header
                route={route}
                onClose={onClose}
            />
            <View style={globalStyles.flexBox}>
                <>
                    <View style={[globalStyles.flexBox, styles.list]}>
                        <FlatList
                            data={categories}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <CategoryListItem
                                    item={item}
                                    authorities={authorities ?? []}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            )}
                        />
                    </View>
                    <FAB
                        icon='plus'
                        onPress={onAdd}
                        style={globalStyles.fab}
                    />
                </>
            </View>
            {editInfo && (
                <AddOrEditCategoryModal
                    editInfo={editInfo.editInfo}
                    onClose={() => {
                        refetchCategories()
                        setEditInfo(undefined)
                    }}
                />
            )}
        </View>
    )
}

export default CategoriesManagement
