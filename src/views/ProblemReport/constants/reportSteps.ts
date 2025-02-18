import ReportCategoryStep from '~/views/ProblemReport/components/ReportCategoryStep'
import ReportLocationStep from '~/views/ProblemReport/components/ReportLocationStep'
import ReportPictureStep from '~/views/ProblemReport/components/ReportPictureStep'
import ReportProblemStep from '~/views/ProblemReport/components/ReportProblemStep'
import ReportReviewStep from '~/views/ProblemReport/components/ReportReviewStep'
import { ReportStep } from '~/views/ProblemReport/types/ReportStep'

export const REPORT_STEPS: ReportStep[] = [
    {
        serial: 1,
        title: 'Standort des Problems',
        component: ReportLocationStep,
    },
    {
        serial: 2,
        title: 'Bild des Problems',
        component: ReportPictureStep,
    },
    {
        serial: 3,
        title: 'Beschreibung des Problems',
        component: ReportProblemStep,
    },
    {
        serial: 4,
        title: 'Zuständige Stelle',
        component: ReportCategoryStep,
    },
    {
        serial: 5,
        title: 'Überprüfen',
        component: ReportReviewStep,
    },
]
