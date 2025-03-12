import { useMemo } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Icon, Text, TouchableRipple } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import getRatingIcons from '~/shared/helpers/getRatingIcons'
import { Category, Problem } from '~/supabase/types'
import CategoryListItem from '~/views/AuthorityDetailView/components/CategoryListItem'

type Props = {
    averageRating: number
    categories: Category[]
    problems: Problem[]
    onReviewPress: () => void
}

const styles = StyleSheet.create({
    icon: {
        alignSelf: 'flex-start',
    },
    categories: {
        maxHeight: 200,
    },
    categoriesList: {
        backgroundColor: colors.secondary,
        borderRadius: 10,
        marginTop: 10,
    },
    limitedHeight: {
        height: 400,
    },
    ripple: {
        paddingHorizontal: 20,
        borderRadius: 100,
        height: RFValue(40),
        justifyContent: 'center',
        backgroundColor: colors.secondary,
    },
})

const AuthorityDetails = ({ averageRating, categories, problems, onReviewPress }: Props) => {
    const doneProblemsCount = useMemo(
        () => problems.filter((problem) => problem.status === ProblemStatus.Done).length,
        [problems],
    )

    const openProblemsCount = useMemo(
        () =>
            problems.filter(
                (problem) =>
                    problem.status !== ProblemStatus.Done &&
                    problem.status !== ProblemStatus.Cancelled,
            ).length,
        [problems],
    )

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
                    {getRatingIcons({
                        status: ProblemStatus.Done,
                        rating: averageRating,
                        size: RFValue(25),
                        primaryColor: true,
                    })}
                </Text>
            </TouchableRipple>
            <Text style={globalStyles.subtitle}>Gelöste Probleme: {doneProblemsCount}</Text>
            <Text style={globalStyles.subtitle}>Ungelöste Probleme: {openProblemsCount}</Text>
        </View>
    )
}

export default AuthorityDetails
