import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { globalStyles } from '~/shared/constants/globalStyles'
import PictureSelection from '~/shared/views/Inputs/PictureSelection'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import { ReportStepProps } from '~/views/ProblemReport/types/ReportStepProps'

const styles = StyleSheet.create({
    header: {
        margin: 10,
    },
})

const ReportPictureStep = ({ isLoading }: ReportStepProps) => {
    if (isLoading) return <LoadingSpinner />

    return (
        <View style={globalStyles.flexBox}>
            <View style={styles.header}>
                <Text
                    variant='bodyMedium'
                    style={globalStyles.mb}
                >
                    Mache ein Bild des Problems.
                </Text>
            </View>
            <PictureSelection name='image' />
        </View>
    )
}

export default ReportPictureStep
