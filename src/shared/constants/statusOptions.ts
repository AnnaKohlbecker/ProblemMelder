import { ProblemStatus } from '~/shared/enums/ProblemStatus'

export const statusOptions = [
    { label: 'Kein Filter', value: -2 },
    { label: 'Deaktiviert', value: ProblemStatus.Cancelled },
    { label: 'Zu Erledigen', value: ProblemStatus.ToDo },
    { label: 'In Bearbeitung', value: ProblemStatus.InProgress },
    { label: 'Erledigt', value: ProblemStatus.Done },
]
