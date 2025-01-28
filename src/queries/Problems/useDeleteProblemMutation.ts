import { useCallback } from 'react'

import { supabase } from '~/services/supabase'
import { Table } from '~/shared/enums/Table'

export const useDeleteProblemMutation = () => {
    return useCallback(async (problemId: number) => {
        const { error, status } = await supabase.from(Table.Problems).delete().eq('id', problemId)
        if (error) {
            // eslint-disable-next-line no-console
            console.error('Deletion Error:', error)
            throw error // Ensure the error is passed back to the caller
        }
        if (status !== 200) {
            throw new Error('Failed to delete problem, status: ' + status)
        }
    }, [])
}
