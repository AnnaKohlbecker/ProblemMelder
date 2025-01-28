import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { Table } from '~/shared/enums/Table'
import { Problem } from '~/shared/types/Problem'

type Payload = Problem

export const useUpsertProblemMutation = () => {
    const mutationFn = useCallback(async (data: Payload) => {
        return await supabase.from(Table.Problems).upsert(data).throwOnError()
    }, [])

    return useMutation({
        mutationKey: ['upsertProblemMutation'],
        mutationFn,
    })
}
