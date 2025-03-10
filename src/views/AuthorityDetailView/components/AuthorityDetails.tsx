import { FlatList, ScrollView, StyleSheet, View } from 'react-native'
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
    wrapper: {
        maxHeight: '80%',
        minHeight: 600,
        gap: 15,
    },

    authorityContent: {
        backgroundColor: colors.tertiary,
        borderRadius: 10,
        padding: 7,
        rowGap: 15,
        marginBottom: 40,
    },
    categories: {
        height: 200,
    },
})

const AuthorityDetails = ({ authority, categories }: Props) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.authorityContent}>
                <View style={globalStyles.flexRowWithGap}>
                    <View style={styles.icon}>
                        <Icon
                            source='book'
                            size={RFValue(23)}
                            color={colors.primary}
                        />
                    </View>
                    <ScrollView style={styles.categories}>
                        <FlatList
                            data={categories}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <CategoryListItem item={item} />}
                        />
                    </ScrollView>
                </View>
            </View>
            <Text>{authority.name}</Text>
        </View>
    )
}

export default AuthorityDetails
