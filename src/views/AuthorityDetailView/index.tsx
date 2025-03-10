import { useEffect } from 'react'
import { BackHandler, StyleSheet, View } from 'react-native'
import { Card, Divider, IconButton, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { useCategoryByAuthorityQuery } from '~/queries/Categories/useCategoryByAuthorityQuery'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import { Authority } from '~/supabase/types'
import AuthorityDetails from '~/views/AuthorityDetailView/components/AuthorityDetails'

type Props = {
    authority: Authority
    onClose: () => void
}

const styles = StyleSheet.create({
    card: {
        height: '60%',
        padding: 15,
        width: '90%',
    },
    gapBetween: {
        gap: 10,
    },
    title: {
        fontSize: RFValue(14),
        fontWeight: 'bold',
        maxWidth: '80%',
    },
    wrapper: {
        alignItems: 'center',
        backgroundColor: colors.backdrop,
        elevation: 1000,
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
    },
    headerWrapper: {
        width: '70%',
        gap: 4,
        flexDirection: 'row',
    },
    buttons: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '30%',
        flexDirection: 'row',
    },
})

const AuthorityDetailView = ({ authority, onClose }: Props) => {
    const { data: categories, isLoading: categoriesLoading } = useCategoryByAuthorityQuery({
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

    return (
        <View style={[StyleSheet.absoluteFillObject, styles.wrapper]}>
            <Card style={[globalStyles.bgWhite, styles.card]}>
                {categoriesLoading ? (
                    <View style={globalStyles.flexRow}>
                        <LoadingSpinner size={70} />
                    </View>
                ) : (
                    <View style={styles.gapBetween}>
                        <View style={styles.header}>
                            <View style={[globalStyles.flexRow, styles.headerWrapper]}>
                                <Text
                                    style={styles.title}
                                    numberOfLines={2}
                                    ellipsizeMode='tail'
                                >
                                    {authority.name}
                                </Text>
                            </View>

                            <View style={styles.buttons}>
                                <IconButton
                                    icon='close'
                                    onPress={onClose}
                                    size={RFValue(20)}
                                    mode='contained'
                                />
                            </View>
                        </View>
                        <Divider style={globalStyles.divider} />
                        <AuthorityDetails
                            authority={authority}
                            categories={categories ?? []}
                        />
                    </View>
                )}
            </Card>
        </View>
    )
}

export default AuthorityDetailView
