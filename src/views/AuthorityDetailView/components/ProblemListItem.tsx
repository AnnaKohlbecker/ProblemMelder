import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Icon, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { globalStyles } from '~/shared/constants/globalStyles'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import getRatingIcons from '~/shared/helpers/getRatingIcons'
import { Category, ProblemWithSanitizedProblemReviews } from '~/supabase/types'

const styles = StyleSheet.create({
    card: {
        margin: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    gap: {
        gap: 4,
        marginBottom: 8,
    },
    wrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 2,
    },
})

type Props = {
    categories: Category[]
    item: ProblemWithSanitizedProblemReviews
}

const ProblemListItem = ({ categories, item }: Props) => {
    const category = useMemo(() => {
        return categories.find((category) => category.id === item.categoryId)
    }, [categories, item.categoryId])

    const averageRating = useMemo(() => {
        let ratingSum = 0
        let ratingCount = 0

        item.SanitizedProblemReviews.forEach((review) => {
            if (review.stars === null) return

            ratingSum += review.stars
            ratingCount++
        })

        return ratingSum / ratingCount
    }, [item.SanitizedProblemReviews])

    return (
        <Card style={[globalStyles.card, styles.card]}>
            <View style={styles.wrapper}>
                <View style={globalStyles.flexBox}>
                    <View style={[globalStyles.flexRow, styles.gap]}>
                        <Icon
                            size={24}
                            source={category?.icon}
                        />
                        <Text
                            style={globalStyles.subtitle}
                            numberOfLines={1}
                            ellipsizeMode='tail'
                        >
                            {item.title}
                        </Text>
                    </View>
                    <Text style={globalStyles.subtitle}>
                        {getRatingIcons({
                            status: ProblemStatus.Done,
                            rating: averageRating,
                            size: RFValue(20),
                            primaryColor: true,
                        })}
                    </Text>
                </View>
            </View>
        </Card>
    )
}

export default ProblemListItem
