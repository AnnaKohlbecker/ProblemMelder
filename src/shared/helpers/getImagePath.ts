import { supabaseUrl } from '@env'

export const getImagePath = (image: string) => {
    return `${process.env.SUPABASE_URL ?? supabaseUrl}/storage/v1/object/public/images/${image}.jpg`
}
