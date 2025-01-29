import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { Table } from '~/shared/enums/Table'
import { Problem } from '~/shared/models/Problem'

type Payload = Problem

export const useDeleteProblemMutation = () => {
    const mutationFn = useCallback(async (data: Payload) => {
        return await supabase.from(Table.Problems).delete().eq('id', data.id).throwOnError()
    }, [])

    return useMutation({
        mutationKey: ['deleteProblemMutation'],
        mutationFn,
    })
}
