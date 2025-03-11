import { ParamListBase, Route, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { isNil } from 'lodash'
import { useCallback, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { FAB } from 'react-native-paper'
import { useAuthoritiesQuery } from '~/queries/Authorities/useAuthoritiesQuery'
import { useDeleteAuthorityMutation } from '~/queries/Authorities/useDeleteAuthorityMutation'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useDialog } from '~/shared/context/DialogContext'
import { useSnackbar } from '~/shared/context/SnackbarContext'
import { Route as RouteEnum } from '~/shared/enums/Route'
import Header from '~/shared/views/Header'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import { Authority } from '~/supabase/types'
import AddOrEditAuthorityModal from '~/views/Management/Authorities/components/AddOrEditAuthorityModal'
import AuthorityManagementListItem from '~/views/Management/Authorities/components/AuthorityManagementListItem'

type Props = {
    route: Route<RouteEnum>
}

const styles = StyleSheet.create({
    list: {
        paddingVertical: 10,
    },
})

const AuthoritiesManagement = ({ route }: Props) => {
    const showDialog = useDialog()
    const showSnackbar = useSnackbar()

    const [editInfo, setEditInfo] = useState<{ editInfo?: Authority }>()

    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()

    const { mutate: deleteAuthority } = useDeleteAuthorityMutation()
    const {
        data: authorities,
        isLoading: authoritiesLoading,
        refetch: refetchAuthorities,
    } = useAuthoritiesQuery()

    const onClose = useCallback(() => {
        navigate(RouteEnum.MANAGEMENT)
    }, [navigate])

    const onAdd = useCallback(() => {
        setEditInfo({})
    }, [])

    const onEdit = useCallback((authority: Authority) => {
        setEditInfo({ editInfo: authority })
    }, [])

    const onDelete = useCallback(
        (authority: Authority) => {
            if (isNil(authority.id)) return

            showDialog({
                title: 'Behörde löschen?',
                description:
                    'Möchtest du diese Behörde wirklich löschen? Diese Änderung kann nicht Rückgängig gemacht werden.',
                onAccept: () => {
                    deleteAuthority(authority.id)
                    refetchAuthorities()
                    showSnackbar('Die Behörde wurde erfolgreich gelöscht.')
                },
            })
        },
        [deleteAuthority, refetchAuthorities, showDialog, showSnackbar],
    )

    if (authoritiesLoading) return <LoadingSpinner />

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
                            data={authorities}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <AuthorityManagementListItem
                                    item={item}
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
                <AddOrEditAuthorityModal
                    editInfo={editInfo.editInfo}
                    onClose={() => {
                        refetchAuthorities()
                        setEditInfo(undefined)
                    }}
                />
            )}
        </View>
    )
}

export default AuthoritiesManagement
