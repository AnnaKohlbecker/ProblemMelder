import { ScrollView, StyleSheet, View } from 'react-native'
import { Icon, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Authority } from '~/supabase/types'

type Props = {
    authority: Authority
}

const styles = StyleSheet.create({
    flexText: {
        flexShrink: 1,
        flexWrap: 'wrap',
    },
    icon: {
        alignSelf: 'flex-start',
    },
    description: {
        height: 160,
    },
    wrapper: {
        maxHeight: '80%',
        minHeight: 600,
        gap: 15,
    },
    text: {
        fontSize: RFValue(14),
    },
    authorityContent: {
        backgroundColor: colors.tertiary,
        borderRadius: 10,
        padding: 7,
        rowGap: 15,
        marginBottom: 40,
    },
})

const AuthorityDetails = ({ authority }: Props) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.authorityContent}>
                <View style={globalStyles.flexRow}>
                    <View style={styles.icon}>
                        <Icon
                            source='email'
                            size={RFValue(23)}
                            color={colors.primary}
                        />
                    </View>
                    <Text style={styles.text}>{authority.domain}</Text>
                </View>
                <View style={globalStyles.flexRow}>
                    <View style={styles.icon}>
                        <Icon
                            source='text-long'
                            size={RFValue(23)}
                            color={colors.primary}
                        />
                    </View>
                    <ScrollView style={styles.description}>
                        <Text style={[styles.flexText, styles.text]}>{authority.name}</Text>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

export default AuthorityDetails
