import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { never } from '~/shared/helpers/never'

export const problemStatusToColor = (status: ProblemStatus) => {
    switch (status) {
        case ProblemStatus.Cancelled:
            return 'gray'
        case ProblemStatus.ToDo:
            return 'red'
        case ProblemStatus.InProgress:
            return 'yellow'
        case ProblemStatus.Done:
            return 'green'
        default:
            return never(status, `Unexpeced ProblemStatus ${status}. This should never happen.`)
    }
}
