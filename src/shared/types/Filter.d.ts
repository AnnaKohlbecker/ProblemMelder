export type ProblemFilterFormData = Omit<Problem, 'id'> & {
    id?: number
    radius: number
}
