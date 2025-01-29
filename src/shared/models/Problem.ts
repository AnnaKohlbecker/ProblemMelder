import { ProblemStatus } from '~/shared/enums/ProblemStatus'

export type Problem = {
    id: number
    title: string
    location: string
    description: string
    image: string
    status: ProblemStatus
    authorityId: number
    userId: string
    rating: number
    date: Date
}
