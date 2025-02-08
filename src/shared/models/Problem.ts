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
    stars: number | undefined
    date: Date
    starsVotesCount: number
    priorityVotesCount: number
    priority: number | undefined
    categoryId: number
}
