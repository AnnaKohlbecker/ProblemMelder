import { supabaseUrl } from '@env'

export const getImagePath = (image: string) => {
    return `${supabaseUrl}/storage/v1/object/public/images/${image}.jpg`
}
