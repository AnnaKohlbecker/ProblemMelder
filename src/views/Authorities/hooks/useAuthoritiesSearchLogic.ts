import { useDeferredValue, useMemo, useState } from 'react'
import { Authority } from '~/supabase/types'

type Props = {
    authorities: Authority[]
}

export const useAuthoritiesSearchLogic = ({ authorities }: Props) => {
    const [search, setSearch] = useState('')
    const debouncedSearch = useDeferredValue(search)

    const searchedAuthorities = useMemo(() => {
        return authorities.filter((authority) =>
            authority.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
        )
    }, [authorities, debouncedSearch])

    return {
        search,
        setSearch,
        searchedAuthorities,
    }
}
