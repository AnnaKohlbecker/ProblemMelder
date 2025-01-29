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
    date: Date
    resolved: boolean
    satisfactionVotesCount: number
    satisfactionRating: number
    priorityVotesCount: number
    priorityRating: number
}
