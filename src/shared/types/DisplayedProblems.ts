import { Problem } from '~/shared/models/Problem'

export type DisplayedProblem = Problem & {
    formattedDate: string
    address: string
    commentsCount: number
}
