import { Comment } from '~/shared/models/Comment'
import { UserData } from '~/shared/models/UserData'

export type CommentWithUserData = Comment & {
    UserData: UserData
}
