import { useDeferredValue, useMemo, useState } from 'react'
import { Problem } from '~/shared/models/Problem'

type Props = {
    problems: Problem[]
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
