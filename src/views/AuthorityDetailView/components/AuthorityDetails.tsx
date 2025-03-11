import { FlatList, StyleSheet, View } from 'react-native'
import { Icon, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { Authority, Category } from '~/supabase/types'
import CategoryListItem from '~/views/AuthorityDetailView/components/CategoryListItem'

type Props = {
    authority: Authority
    categories: Category[]
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
})

const AuthorityDetails = ({ authority, categories }: Props) => {
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
            <Text style={globalStyles.subtitle}>TODO: Bewertung von {authority.name}</Text>
        </View>
    )
}

export default AuthorityDetails
