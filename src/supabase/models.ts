export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
    public: {
        Tables: {
            Authorities: {
                Row: {
                    allowSignup: boolean
                    domain: string | null
                    id: number
                    name: string
                }
                Insert: {
                    allowSignup?: boolean
                    domain?: string | null
                    id?: number
                    name: string
                }
                Update: {
                    allowSignup?: boolean
                    domain?: string | null
                    id?: number
                    name?: string
                }
                Relationships: []
            }
            Categories: {
                Row: {
                    authorityId: number
                    description: string
                    icon: string
                    id: number
                    title: string
                }
                Insert: {
                    authorityId: number
                    description?: string
                    icon: string
                    id?: number
                    title: string
                }
                Update: {
                    authorityId?: number
                    description?: string
                    icon?: string
                    id?: number
                    title?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'ProblemCategories_authorityId_fkey'
                        columns: ['authorityId']
                        isOneToOne: false
                        referencedRelation: 'Authorities'
                        referencedColumns: ['id']
                    },
                ]
            }
            ProblemComments: {
                Row: {
                    content: string
                    id: number
                    problemId: number
                    timestamp: string
                    userId: string
                }
                Insert: {
                    content: string
                    id?: number
                    problemId: number
                    timestamp?: string
                    userId: string
                }
                Update: {
                    content?: string
                    id?: number
                    problemId?: number
                    timestamp?: string
                    userId?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'Comments_problemId_fkey'
                        columns: ['problemId']
                        isOneToOne: false
                        referencedRelation: 'Problems'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'ProblemComments_userId_fkey'
                        columns: ['userId']
                        isOneToOne: false
                        referencedRelation: 'UserData'
                        referencedColumns: ['userId']
                    },
                ]
            }
            ProblemReviews: {
                Row: {
                    helpful: boolean | null
                    id: number
                    importance: number | null
                    problemId: number
                    stars: number | null
                    userId: string
                }
                Insert: {
                    helpful?: boolean | null
                    id?: number
                    importance?: number | null
                    problemId: number
                    stars?: number | null
                    userId?: string
                }
                Update: {
                    helpful?: boolean | null
                    id?: number
                    importance?: number | null
                    problemId?: number
                    stars?: number | null
                    userId?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'ProblemReviews_problemId_fkey'
                        columns: ['problemId']
                        isOneToOne: false
                        referencedRelation: 'Problems'
                        referencedColumns: ['id']
                    },
                ]
            }
            Problems: {
                Row: {
                    authorityId: number
                    categoryId: number
                    closedDate: string | null
                    date: string
                    description: string
                    id: number
                    image: string
                    location: string
                    reasonForDeactivation: string | null
                    reasonForReactivation: string | null
                    status: number
                    title: string
                    userId: string
                }
                Insert: {
                    authorityId: number
                    categoryId: number
                    closedDate?: string | null
                    date?: string
                    description: string
                    id?: number
                    image: string
                    location: string
                    reasonForDeactivation?: string | null
                    reasonForReactivation?: string | null
                    status?: number
                    title: string
                    userId: string
                }
                Update: {
                    authorityId?: number
                    categoryId?: number
                    closedDate?: string | null
                    date?: string
                    description?: string
                    id?: number
                    image?: string
                    location?: string
                    reasonForDeactivation?: string | null
                    reasonForReactivation?: string | null
                    status?: number
                    title?: string
                    userId?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'Problems_authorityId_fkey'
                        columns: ['authorityId']
                        isOneToOne: false
                        referencedRelation: 'Authorities'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'Problems_categoryId_fkey'
                        columns: ['categoryId']
                        isOneToOne: false
                        referencedRelation: 'Categories'
                        referencedColumns: ['id']
                    },
                ]
            }
            Roles: {
                Row: {
                    displayName: string | null
                    id: number
                    name: string
                }
                Insert: {
                    displayName?: string | null
                    id?: number
                    name: string
                }
                Update: {
                    displayName?: string | null
                    id?: number
                    name?: string
                }
                Relationships: []
            }
            UserData: {
                Row: {
                    authorityId: number | null
                    email: string | null
                    id: number
                    name: string
                    points: number
                    role: number
                    userId: string
                }
                Insert: {
                    authorityId?: number | null
                    email?: string | null
                    id?: number
                    name: string
                    points: number
                    role: number
                    userId?: string
                }
                Update: {
                    authorityId?: number | null
                    email?: string | null
                    id?: number
                    name?: string
                    points?: number
                    role?: number
                    userId?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'UserData_authorityId_fkey'
                        columns: ['authorityId']
                        isOneToOne: false
                        referencedRelation: 'Authorities'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'UserRoles_role_fkey'
                        columns: ['role']
                        isOneToOne: false
                        referencedRelation: 'Roles'
                        referencedColumns: ['id']
                    },
                ]
            }
        }
        Views: {
            SanitizedProblemReviews: {
                Row: {
                    helpful: boolean | null
                    id: number | null
                    importance: number | null
                    problemId: number | null
                    stars: number | null
                }
                Insert: {
                    helpful?: boolean | null
                    id?: number | null
                    importance?: number | null
                    problemId?: number | null
                    stars?: number | null
                }
                Update: {
                    helpful?: boolean | null
                    id?: number | null
                    importance?: number | null
                    problemId?: number | null
                    stars?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'ProblemReviews_problemId_fkey'
                        columns: ['problemId']
                        isOneToOne: false
                        referencedRelation: 'Problems'
                        referencedColumns: ['id']
                    },
                ]
            }
        }
        Functions: Record<never, never>
        Enums: Record<never, never>
        CompositeTypes: Record<never, never>
    }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
              Database[PublicTableNameOrOptions['schema']]['Views'])
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
          Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
          Row: infer R
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
      ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
            Row: infer R
        }
          ? R
          : never
      : never

export type TablesInsert<
    PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Insert: infer I
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
      ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
            Insert: infer I
        }
          ? I
          : never
      : never

export type TablesUpdate<
    PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Update: infer U
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
      ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
            Update: infer U
        }
          ? U
          : never
      : never

export type Enums<
    PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
      ? PublicSchema['Enums'][PublicEnumNameOrOptions]
      : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
        | keyof PublicSchema['CompositeTypes']
        | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database
    }
        ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
        : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
      ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
      : never
