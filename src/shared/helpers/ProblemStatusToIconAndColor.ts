import GreenMarker from 'assets/marker-green.png'
import OrangeMarker from 'assets/marker-orange.png'
import RedMarker from 'assets/marker-red.png'
import SecondaryMarker from 'assets/marker-secondary.png'
import { colors } from '~/shared/constants/colors'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { never } from '~/shared/helpers/never'

export const problemStatusToIconAndColor = (status: ProblemStatus | undefined) => {
    switch (status) {
        case undefined:
            return { icon: 'filter-remove', color: colors.secondary, markerImage: SecondaryMarker }
        case ProblemStatus.Cancelled:
            return { icon: 'cancel', color: colors.secondary, markerImage: SecondaryMarker }
        case ProblemStatus.ToDo:
            return { icon: 'alert-circle', color: colors.red, markerImage: RedMarker }
        case ProblemStatus.InProgress:
            return { icon: 'progress-wrench', color: colors.orange, markerImage: OrangeMarker }
        case ProblemStatus.Done:
            return { icon: 'check-circle', color: colors.green, markerImage: GreenMarker }
        default:
            return never(status, `Unexpected ProblemStatus ${status}. This should never happen.`)
    }
}
