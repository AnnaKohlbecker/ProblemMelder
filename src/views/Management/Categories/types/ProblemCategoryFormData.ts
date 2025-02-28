import { Category } from '~/shared/models/Category'

export type ProblemCategoryFormData = Omit<Category, 'id'> & {
    id?: number
}
