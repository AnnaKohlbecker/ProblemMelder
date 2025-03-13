import { StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'

const styles = StyleSheet.create({
    ratingIcon: {
        marginHorizontal: 0,
        padding: 0,
    },
})

type Props = {
    status: ProblemStatus
    rating: number
    size?: number
    primaryColor?: boolean
}

const getRating = ({ status, rating, size = RFValue(18), primaryColor = false }: Props) => {
    const maxRating = status === ProblemStatus.Done ? 5 : 3
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
                size={size}
                iconColor={
                    primaryColor
                        ? colors.primary
                        : status === ProblemStatus.Done
                          ? colors.yellow
                          : colors.red
                }
                style={styles.ratingIcon}
            />
        )
    })
}

export default getRating
