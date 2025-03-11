import { useEffect } from 'react'
import { BackHandler, StyleSheet, View } from 'react-native'
import { Card, IconButton, Text } from 'react-native-paper'
import { useCategoriesByAuthorityQuery } from '~/queries/Categories/useCategoriesByAuthorityQuery'
import { globalStyles } from '~/shared/constants/globalStyles'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import { Authority } from '~/supabase/types'
import AuthorityDetails from '~/views/AuthorityDetailView/components/AuthorityDetails'

type Props = {
    authority: Authority
    onClose: () => void
}

const AuthorityDetailView = ({ authority, onClose }: Props) => {
    const { data: categories, isLoading: categoriesLoading } = useCategoriesByAuthorityQuery({
        authorityId: authority.id,
    })

    useEffect(() => {
        const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
            onClose()
            return true
        })

        return () => {
            subscription.remove()
        }
    }, [onClose])

    if (categoriesLoading) return <LoadingSpinner />

    return (
        <View style={[StyleSheet.absoluteFillObject, globalStyles.dialogWrapper]}>
            <Card style={globalStyles.dialogCard}>
                <View style={globalStyles.cardHeader}>
                    <Text
                        style={globalStyles.cardHeaderTitle}
                        numberOfLines={2}
                        ellipsizeMode='tail'
                    >
                        {authority.name}
                    </Text>

                    <View style={globalStyles.cardHeaderButtons}>
                        <IconButton
                            icon='close'
                            onPress={onClose}
                            mode='contained'
                        />
                    </View>
                </View>
                <AuthorityDetails
                    authority={authority}
                    categories={categories ?? []}
                />
            </Card>
        </View>
    )
}

export default AuthorityDetailView
