import { isNil } from 'lodash'
import { useMemo } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Card, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { useUserByIdQuery } from '~/queries/UserData/useUserByIdQuery'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { PrestiegeInformation } from '~/shared/constants/prestiegeInformation'
import { useAuth } from '~/shared/context/AuthContext'
import LoadingSpinner from '~/shared/views/LoadingSpinner'

const styles = StyleSheet.create({
    card: {
        padding: 20,
    },
    cardWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 20,
    },
    view: {
        padding: 20,
    },
    image: {
        aspectRatio: 1,
        height: RFValue(50),
    },
    imageWrapper: {
        alignItems: 'flex-start',
    },
    infoText: {
        fontSize: RFValue(15),
    },
    infoTextBlue: {
        color: colors.secondary,
        fontSize: RFValue(15),
    },
    infoWrapper: {
        gap: 15,
        marginTop: RFValue(15),
    },
    name: {
        fontSize: RFValue(18),
        paddingBottom: 5,
    },
})

const ProfileHeader = () => {
    const { session, role } = useAuth()

    const { data: user, isLoading: userLoading } = useUserByIdQuery({ userId: session?.user.id })

    const prestiegeInfo = useMemo(() => {
        if (isNil(user?.points) || user.points < 100) return PrestiegeInformation[0]
        else if (user.points < 500) return PrestiegeInformation[1]
        else if (user.points < 1000) return PrestiegeInformation[2]

        return PrestiegeInformation[3]
    }, [user?.points])

    if (isNil(user) || userLoading || isNil(role)) return <LoadingSpinner />

    return (
        <View style={styles.view}>
            <Card style={[globalStyles.card, styles.card]}>
                <View style={styles.cardWrapper}>
                    <View style={styles.imageWrapper}>
                        <Image
                            source={prestiegeInfo.image}
                            style={styles.image}
                        />
                    </View>

                    <Text style={[globalStyles.bold, styles.name]}>{user.name}</Text>
                </View>

                <View style={styles.infoWrapper}>
                    <Text style={styles.infoText}>
                        <Text style={styles.infoText}>{role.displayName}</Text>
                    </Text>
                    {role.name !== 'admin' && role.name !== 'manager' && (
                        <>
                            <Text style={styles.infoText}>
                                Rolle:{' '}
                                <Text style={[globalStyles.bold, styles.infoText]}>
                                    {prestiegeInfo.role}
                                </Text>
                            </Text>
                            <Text style={styles.infoText}>
                                Punkte:{' '}
                                <Text style={[globalStyles.bold, styles.infoText]}>
                                    {user.points}
                                </Text>
                            </Text>
                            {isNil(prestiegeInfo.nextRolePoints) ? (
                                <Text style={styles.infoTextBlue}>Höchste Rolle erreicht!</Text>
                            ) : (
                                <Text style={styles.infoTextBlue}>
                                    {prestiegeInfo.nextRole} ab {prestiegeInfo.nextRolePoints}{' '}
                                    Punkten!
                                </Text>
                            )}
                        </>
                    )}
                </View>
            </Card>
        </View>
    )
}
export default ProfileHeader
