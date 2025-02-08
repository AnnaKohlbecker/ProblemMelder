import { Authority } from '~/shared/models/Authority'

export type AuthorityFormData = Omit<Authority, 'id'> & {
    id?: number
}
