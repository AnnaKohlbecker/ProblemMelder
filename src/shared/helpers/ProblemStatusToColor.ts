import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { never } from '~/shared/helpers/never'

export const problemStatusToColor = (status: ProblemStatus) => {
    switch (status) {
        case ProblemStatus.Cancelled:
            return '#979797'
        case ProblemStatus.ToDo:
            return '#ec0505'
        case ProblemStatus.InProgress:
            return '#ffdd00'
        case ProblemStatus.Done:
            return '#0ead0e'
        default:
            return never(status, `Unexpeced ProblemStatus ${status}. This should never happen.`)
    }
}
