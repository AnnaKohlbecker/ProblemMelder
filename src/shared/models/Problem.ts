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
    starsVotesCount: number
    stars: number | null
    priorityVotesCount: number
    priority: number | null
    commentsCount: number
}
