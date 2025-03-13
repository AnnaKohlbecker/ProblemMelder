import { ReportStep } from '~/views/ProblemReport/enums/ReportStep'
import { ReportStepProps } from '~/views/ProblemReport/types/ReportStepProps'

export type ReportStepInfo = {
    reportStep: ReportStep
    title: string
    component: (props: ReportStepProps) => React.JSX.Element
}
