import { useQuery } from '@tanstack/react-query'
import { Dictionary } from 'lodash'
import { useCallback } from 'react'
import { supabase } from '~/services/supabase'
import { Problem } from '~/shared/models/Problem'

type Props = {
    problems: Problem[] | undefined
}

export const useImageByNameQuery = ({ problems }: Props) => {
    const queryFn = useCallback(async () => {
        const data = problems
            ? await Promise.all(
                  problems.map(async (problem) => {
                      const response = await supabase.storage
                          .from('images')
                          .createSignedUrl(`public/${problem.image}.jpg`, 60000)
                      return {
                          [problem.image.toString()]: response.data?.signedUrl.toString(),
                      } as Dictionary<string>
                  }),
              )
            : []
        return data as Dictionary<string>[]
    }, [problems])

    return useQuery<Dictionary<string>[]>({
        queryKey: ['imageByNameQuery', problems],
        queryFn,
        enabled: !!problems,
    })
}
