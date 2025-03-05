import { Category } from '~/supabase/types'

export type ProblemCategoryFormData = Omit<Category, 'id'> & {
    id?: number
}
