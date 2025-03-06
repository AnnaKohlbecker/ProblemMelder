import { useDeferredValue, useMemo, useState } from 'react'
import { UserData } from '~/supabase/types'

type Props = {
    employees: UserData[]
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
