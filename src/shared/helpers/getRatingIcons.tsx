import { StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'

const styles = StyleSheet.create({
    ratingIcon: {
        marginHorizontal: 0,
        padding: 0,
    },
})

const getRating = (status: number, rating: number) => {
    const maxRating = status === 2 ? 5 : 3
    const filledCount = Math.floor(rating)

    return Array.from({ length: maxRating }, (_, i) => {
        const isFilled = i < filledCount
        const iconName =
            status === 2
                ? isFilled
                    ? 'star'
                    : 'star-outline'
                : isFilled
                  ? 'alert-circle'
                  : 'alert-circle-outline'

        return (
            <IconButton
                key={i}
                icon={iconName}
                size={RFValue(25)}
                iconColor={status === 2 ? colors.yellow : colors.red}
                style={styles.ratingIcon}
            />
        )
    })
}

export default getRating
