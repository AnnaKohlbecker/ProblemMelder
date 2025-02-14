import { useDeferredValue, useMemo, useState } from 'react'
import { User } from '~/shared/models/User'

type Props = {
    employees: User[]
}

export const useEmployeeSearchLogic = ({ employees }: Props) => {
    const [search, setSearch] = useState('')
    const debouncedSearch = useDeferredValue(search)

    const filteredEmployees = useMemo(() => {
        return employees.filter((e) => e.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
    }, [debouncedSearch, employees])

    return {
        search,
        setSearch,
        filteredEmployees,
    }
}
