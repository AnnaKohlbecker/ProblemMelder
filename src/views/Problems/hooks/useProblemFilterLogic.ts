import { isNil } from 'lodash'
import { useMemo, useState } from 'react'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { Problem } from '~/supabase/types'

type Props = {
    problems: Problem[]
}

export const useProblemsFilterLogic = ({ problems }: Props) => {
    const [filter, setFilter] = useState<ProblemStatus>()

    const filteredProblems = useMemo(() => {
        return problems.filter((problem) => {
            if (isNil(filter)) return problems

            return problem.status === filter
        })
    }, [problems, filter])

    return {
        filter,
        setFilter,
        filteredProblems,
    }
}
