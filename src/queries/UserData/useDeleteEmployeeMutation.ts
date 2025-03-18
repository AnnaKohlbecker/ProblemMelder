import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { supabase } from '~/supabase'
type Props = {
    userId: string
}

export const useDeleteEmployeeMutation = () => {
    const mutationFn = useCallback(async ({ userId }: Props) => {
        return await supabase.from('UserData').delete().eq('userId', userId).throwOnError()
    }, [])

    return useMutation({
        mutationKey: ['deleteEmployeeMutation'],
        mutationFn,
    })
}
