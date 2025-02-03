import { colors } from '~/shared/constants/colors'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { never } from '~/shared/helpers/never'

export const problemStatusToIconAndColor = (
    status: ProblemStatus | null,
): { icon: string; color: string } => {
    switch (status) {
        case null:
            return { icon: 'filter-remove', color: colors.gray }
        case ProblemStatus.Cancelled:
            return { icon: 'cancel', color: colors.gray }
        case ProblemStatus.ToDo:
            return { icon: 'alert-circle', color: colors.red }
        case ProblemStatus.InProgress:
            return { icon: 'progress-wrench', color: colors.orange }
        case ProblemStatus.Done:
            return { icon: 'check-circle', color: colors.green }
        default:
            return never(status, `Unexpected ProblemStatus ${status}. This should never happen.`)
    }
}
