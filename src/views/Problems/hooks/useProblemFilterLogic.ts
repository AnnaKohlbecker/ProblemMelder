import { useDeferredValue, useMemo, useState } from 'react'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { Problem } from '~/shared/models/Problem'

type Props = {
    problems: Problem[]
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
