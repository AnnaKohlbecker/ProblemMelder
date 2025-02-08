import { ProblemCategory } from '~/shared/models/ProblemCategory'

export type ProblemCategoryFormData = Omit<ProblemCategory, 'id'> & {
    id?: number
}
