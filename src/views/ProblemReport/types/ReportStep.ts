import { ReportStepProps } from '~/views/ProblemReport/types/ReportStepProps'

export type ReportStep = {
    serial: number
    title: string
    component: (props: ReportStepProps) => React.JSX.Element
}
