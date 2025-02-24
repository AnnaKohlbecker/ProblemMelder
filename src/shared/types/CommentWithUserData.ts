import { ProblemComment } from '~/shared/models/ProblemComment'
import { UserData } from '~/shared/models/UserData'

export type CommentWithUserData = ProblemComment & {
    UserData: UserData
}
