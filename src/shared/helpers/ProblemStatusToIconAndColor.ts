import { colors } from '~/shared/constants/colors'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { never } from '~/shared/helpers/never'

export const problemStatusToIconAndColor = (status: ProblemStatus | null) => {
    switch (status) {
        case null:
            return { icon: 'filter-remove', color: colors.gray, markerColor: 'orange' }
        case ProblemStatus.Cancelled:
            return { icon: 'cancel', color: colors.gray, markerColor: 'orange' }
        case ProblemStatus.ToDo:
            return { icon: 'alert-circle', color: colors.red, markerColor: 'red' }
        case ProblemStatus.InProgress:
            return { icon: 'progress-wrench', color: colors.orange, markerColor: 'yellow' }
        case ProblemStatus.Done:
            return { icon: 'check-circle', color: colors.green, markerColor: 'green' }
        default:
            return never(status, `Unexpected ProblemStatus ${status}. This should never happen.`)
    }
}
