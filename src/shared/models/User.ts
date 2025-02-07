import { Role } from '~/shared/enums/Role'

export type User = {
    id: number
    role: Role
    points: number
    name: string
    userId: string
}
