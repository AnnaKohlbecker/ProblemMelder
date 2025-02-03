import { useDeferredValue, useMemo, useState } from 'react'
import { DisplayedProblem } from '~/shared/types/DisplayedProblems'

type Props = {
    problems: DisplayedProblem[]
}

export const useProblemsSearchLogic = ({ problems }: Props) => {
    const [search, setSearch] = useState('')
    const debouncedSearch = useDeferredValue(search)

    const searchedProblems = useMemo(() => {
        return problems?.filter((problem) => {
            return problem.title.toLowerCase().includes(debouncedSearch.toLowerCase())
        })
    }, [problems, debouncedSearch])

    return {
        search,
        setSearch,
        searchedProblems,
    }
}
