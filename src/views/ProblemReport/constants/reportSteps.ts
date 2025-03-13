import ReportCategoryStep from '~/views/ProblemReport/components/ReportCategoryStep'
import ReportLocationStep from '~/views/ProblemReport/components/ReportLocationStep'
import ReportPictureStep from '~/views/ProblemReport/components/ReportPictureStep'
import ReportProblemStep from '~/views/ProblemReport/components/ReportProblemStep'
import ReportReviewStep from '~/views/ProblemReport/components/ReportReviewStep'
import { ReportStep } from '~/views/ProblemReport/enums/ReportStep'
import { ReportStepInfo } from '~/views/ProblemReport/types/ReportStep'

export const REPORT_STEPS: ReportStepInfo[] = [
    {
        reportStep: ReportStep.Location,
        title: 'Standort des Problems',
        component: ReportLocationStep,
    },
    {
        reportStep: ReportStep.Picture,
        title: 'Bild des Problems',
        component: ReportPictureStep,
    },
    {
        reportStep: ReportStep.Description,
        title: 'Beschreibung des Problems',
        component: ReportProblemStep,
    },
    {
        reportStep: ReportStep.Category,
        title: 'Zuständige Stelle',
        component: ReportCategoryStep,
    },
    {
        reportStep: ReportStep.Review,
        title: 'Überprüfen',
        component: ReportReviewStep,
    },
]
