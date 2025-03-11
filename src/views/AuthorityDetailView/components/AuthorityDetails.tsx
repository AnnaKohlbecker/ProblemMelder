import { FlatList, StyleSheet, View } from 'react-native'
import { Icon, Text, TouchableRipple } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import getRatingIcons from '~/shared/helpers/getRatingIcons'
import { Category } from '~/supabase/types'
import CategoryListItem from '~/views/AuthorityDetailView/components/CategoryListItem'

type Props = {
    averageRating: number
    categories: Category[]
    onReviewPress: () => void
}

const styles = StyleSheet.create({
    icon: {
        alignSelf: 'flex-start',
    },
    categories: {
        maxHeight: 220,
    },
    categoriesList: {
        backgroundColor: colors.secondary,
        borderRadius: 10,
        marginTop: 10,
    },
    limitedHeight: {
        height: 300,
    },
    ripple: {
        paddingHorizontal: 20,
        borderRadius: 30,
        height: RFValue(40),
        justifyContent: 'center',
    },
})

const AuthorityDetails = ({ averageRating, categories, onReviewPress }: Props) => {
    return (
        <View style={[globalStyles.contentWrapper, styles.limitedHeight]}>
            <View style={styles.categories}>
                <View style={globalStyles.flexRowWithGap}>
                    <View style={styles.icon}>
                        <Icon
                            source='book'
                            size={RFValue(23)}
                            color={colors.primary}
                        />
                    </View>
                    <Text style={globalStyles.subtitle}>Zuständigkeiten</Text>
                </View>
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <CategoryListItem item={item} />}
                    style={styles.categoriesList}
                    persistentScrollbar={true}
                />
            </View>

            <TouchableRipple
                borderless={true}
                style={styles.ripple}
                onPress={onReviewPress}
            >
                <Text style={globalStyles.subtitle}>
                    {getRatingIcons(ProblemStatus.Done, averageRating)}
                </Text>
            </TouchableRipple>
        </View>
    )
}

export default AuthorityDetails
