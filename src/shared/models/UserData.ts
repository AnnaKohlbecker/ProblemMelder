import { Role } from '~/shared/enums/Role'

export type UserData = {
    id: number
    role: Role
    points: number
    name: string
    userId: string
    authorityId: number
}
