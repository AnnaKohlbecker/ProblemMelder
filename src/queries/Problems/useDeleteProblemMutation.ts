import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/supabase'
import { Problem } from '~/supabase/types'

export const useDeleteProblemMutation = () => {
    const mutationFn = useCallback(async (data: Problem) => {
        return await supabase.from('Problems').delete().eq('id', data.id).throwOnError()
    }, [])

    return useMutation({
        mutationKey: ['deleteProblemMutation'],
        mutationFn,
    })
}
