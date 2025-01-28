import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { Problem } from '~/models/Problem'
import { supabase } from '~/services/supabase'
import { Table } from '~/shared/enums/Table'

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
