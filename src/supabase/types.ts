import { Database } from '~/supabase/models'

///////////
// UTILS //
///////////
export type Table<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Row']

export type View<T extends keyof Database['public']['Views']> =
    Database['public']['Views'][T]['Row']

type WithTableRelation<T, K extends keyof Database['public']['Tables']> = T & {
    [P in K]: Database['public']['Tables'][P]['Row']
}

type WithViewRelationOneToMany<T, K extends keyof Database['public']['Views']> = T & {
    [P in K]: Database['public']['Views'][P]['Row'][]
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
// VIEWS //
///////////
export type SanitizedProblemReview = View<'SanitizedProblemReviews'>

///////////
// JOINS //
///////////
export type CommentWithUserData = WithTableRelation<ProblemComment, 'UserData'>

export type ProblemWithSanitizedProblemReviews = WithViewRelationOneToMany<
    Problem,
    'SanitizedProblemReviews'
>
