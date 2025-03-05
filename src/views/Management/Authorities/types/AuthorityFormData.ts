import { Authority } from '~/supabase/types'

export type AuthorityFormData = Omit<Authority, 'id'> & {
    id?: number
}
