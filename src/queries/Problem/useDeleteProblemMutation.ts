import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'

import { supabase } from '~/services/supabase'
import { Table } from '~/shared/enums/Table'

export const useDeleteProblemMutation = () => {
    const mutationFn = useCallback(async (problemId: number | undefined) => {
        await supabase.from(Table.Problems).delete().eq('id', problemId).throwOnError()
    }, [])

    return useMutation({
        mutationFn,
    })
}
