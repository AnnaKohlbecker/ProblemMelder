import { isNil } from 'lodash'
import { useMemo } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Card, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { useUserByIdQuery } from '~/queries/UserData/useUserByIdQuery'
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
    greeting: {
        fontSize: RFValue(14),
        paddingBottom: 5,
    },
    header: {
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
        fontSize: RFValue(10),
    },
})

const ProfileHeader = () => {
    const { session } = useAuth()

    const { data: user, isLoading: userLoading } = useUserByIdQuery({ userId: session?.user.id })

    const prestiegeInfo = useMemo(() => {
        if (isNil(user?.points) || user.points < 100) return PrestiegeInformation[0]
        else if (user.points < 500) return PrestiegeInformation[1]
        else if (user.points < 1000) return PrestiegeInformation[2]

        return PrestiegeInformation[3]
    }, [user?.points])

    return (
        <View style={styles.header}>
            <Card style={[globalStyles.card, styles.card]}>
                <View style={styles.cardWrapper}>
                    <View style={styles.imageWrapper}>
                        <Image
                            source={prestiegeInfo.image}
                            style={styles.image}
                        />
                    </View>
                    <View>
                        {isNil(user) || userLoading ? (
                            <LoadingSpinner />
                        ) : (
                            <>
                                <Text style={[globalStyles.bold, styles.greeting]}>
                                    Hallo, {user.name}!
                                </Text>
                                <Text style={styles.infoText}>
                                    Deine Rolle:{' '}
                                    <Text style={[globalStyles.bold, styles.infoText]}>
                                        {prestiegeInfo.role}
                                    </Text>
                                </Text>
                                <Text style={styles.infoText}>
                                    <Text style={[globalStyles.bold, styles.infoText]}>
                                        {user.points} von {prestiegeInfo.nextRolePoints}
                                    </Text>{' '}
                                    Punkten zur nächsten Rolle!
                                </Text>
                            </>
                        )}
                    </View>
                </View>
            </Card>
        </View>
    )
}
export default ProfileHeader
