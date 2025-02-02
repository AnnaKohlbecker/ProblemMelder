import { useDeferredValue, useMemo, useState } from 'react'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { DisplayedProblem } from '~/shared/models/DisplayedProblems'

type Props = {
    problems: DisplayedProblem[]
}

export const useProblemsFilterLogic = ({ problems }: Props) => {
    const [filter, setFilter] = useState<ProblemStatus | null>(null)
    const debouncedFilter = useDeferredValue(filter)

    const filteredProblems = useMemo(() => {
        return problems?.filter((problem) => {
            if (debouncedFilter === null) return problems
            return problem.status === (debouncedFilter as ProblemStatus)
        })
    }, [problems, debouncedFilter])

    return {
        filter,
        setFilter,
        filteredProblems,
    }
}
