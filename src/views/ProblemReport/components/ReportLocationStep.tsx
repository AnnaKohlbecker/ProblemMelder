import LocationSelection from '~/shared/views/Inputs/LocationSelection'
import LoadingSpinner from '~/shared/views/LoadingSpinner'
import { ReportStepProps } from '~/views/ProblemReport/types/ReportStepProps'

const ReportLocationStep = ({ isLoading }: ReportStepProps) => {
    if (isLoading) return <LoadingSpinner />

    return <LocationSelection name='location' />
}
export default ReportLocationStep
