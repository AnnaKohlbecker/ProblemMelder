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
    stars: number | null
    date: Date
    starsVotesCount: number
    priorityVotesCount: number
    priority: number | null
    commentsCount: number
}
