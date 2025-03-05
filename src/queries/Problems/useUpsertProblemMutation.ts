import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/supabase'
import { Problem } from '~/supabase/types'

export const useUpsertProblemMutation = () => {
    const mutationFn = useCallback(async (data: Problem) => {
        return await supabase.from('Problems').upsert(data).throwOnError()
    }, [])

    return useMutation({
        mutationKey: ['upsertProblemMutation'],
        mutationFn,
    })
}
