import { Database } from '~/supabase/models'

///////////
// UTILS //
///////////
export type Table<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Row']

type WithRelation<T, K extends keyof Database['public']['Tables']> = T & {
    [P in K]: Database['public']['Tables'][P]['Row']
}

////////////
// TABLES //
////////////
export type Authority = Table<'Authorities'>

export type Category = Table<'Categories'>

export type ProblemComment = Table<'ProblemComments'>

export type ProblemReview = Table<'ProblemReviews'>

export type Problem = Table<'Problems'>

export type Role = Table<'Roles'>

export type UserData = Table<'UserData'>

///////////
// JOINS //
///////////
export type CommentWithUserData = WithRelation<ProblemComment, 'UserData'>
