import { StyleSheet, View } from 'react-native'
import { globalStyles } from '~/shared/constants/globalStyles'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import TextInput from '~/shared/views/TextInput'
import { ReportStepProps } from '~/views/ProblemReport/types/ReportStepProps'

const styles = StyleSheet.create({
    formWrapper: {
        gap: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
})

const ReportProblemStep = ({ isLoading }: ReportStepProps) => {
    if (isLoading) return <LoadingSpinner />

    return (
        <View style={[globalStyles.flexBox, styles.formWrapper]}>
            <TextInput
                name='title'
                label='Titel'
                rules={{
                    required: 'Bitte gebe einen Titel ein.',
                }}
                helperText='Kurze Problembeschreibung'
            />
            <TextInput
                name='description'
                label='Beschreibung'
                multiline={true}
                rules={{
                    required: 'Bitte gebe eine Beschreibung ein.',
                }}
                helperText='Problembeschreibung mit allen relevanten Informationen'
            />
        </View>
    )
}

export default ReportProblemStep
