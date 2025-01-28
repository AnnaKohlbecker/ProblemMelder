import { useMutation } from '@tanstack/react-query'
import { decode } from 'base64-arraybuffer'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'

type Payload = {
    path: string
    file: string
}

export const useUploadImageMutation = () => {
    const mutationFn = useCallback(async ({ file, path }: Payload) => {
        const response = await supabase.storage
            .from('images')
            .upload(`public/${path}.jpg`, decode(file), {
                contentType: 'image/jpeg',
                upsert: true,
            })

        if (response.error) throw new Error(response.error.message)

        return response
    }, [])

    return useMutation({
        mutationKey: ['uploadImageMutation'],
        mutationFn,
    })
}
