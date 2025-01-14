# 📁 Queries

This folder contains all the queries and mutations used in the project.

## 📋 Purpose

- **Centralized Storage**: All queries and mutations are stored in this folder.
- **React Query**: All queries and mutations use `@tanstack/react-query`.
- **Unique Query Keys**: Each query has a unique `queryKey` to avoid conflicts.

## 🔍 Example Query

```ts
type Props = {
    exampleId: number | undefined
}

export const useExampleQuery = ({ exampleId }: Props) => {
    const queryFn = useCallback(async () => {
        const response = await supabase
            .from(Table.Example)
            .select('*')
            .eq('id', exampleId)
            .throwOnError()

        return response.data ?? []
    }, [exampleId])

    return useQuery({
        queryKey: ['exampleQuery', exampleId]
        queryFn,
        enabled: !!exampleId
    })
}
```

## 🔄 Example Mutation

```ts
type Payload = {
    example: Example
}

export const useExampleMutation = () => {
    const mutateFn = useCallback(async ({ example }: Payload) => {
        return await supabase.from(Table.Example).upsert(example).throwOnError()
    }, [])

    return useMutation({
        mutationFn,
    })
}
```
