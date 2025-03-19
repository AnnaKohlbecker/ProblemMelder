import { useMemo, useState } from 'react'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { Icon, Text, TouchableRipple } from 'react-native-paper'
import { Authority, UserData } from '~/supabase/types'
import { EmployeeListItem } from '~/views/Management/Employees/components/EmployeeListItem'

const styles = StyleSheet.create({
    content: {
        gap: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    heading: {
        alignItems: 'center',
        flexDirection: 'row',
    },
})

type Props = {
    authority: Authority
    employees: UserData[]
    searching: boolean
}

const AuthorityEmployeeGroup = ({ authority, employees, searching }: Props) => {
    const [expanded, setExpanded] = useState(false)

    const authorityEmployees = useMemo(
        () => employees.filter((employee) => employee.authorityId === authority.id),
        [authority.id, employees],
    )

    const renderItem: ListRenderItem<UserData> = ({ item }) => <EmployeeListItem item={item} />

    // Don't show anything if no employees are found
    if (authorityEmployees.length === 0) return null

    return (
        <View style={styles.content}>
            <TouchableRipple
                onPress={() => {
                    setExpanded(!expanded)
                }}
            >
                <View style={styles.heading}>
                    <Icon
                        source={expanded || searching ? 'chevron-down' : 'chevron-right'}
                        size={20}
                    />
                    <Text variant='titleLarge'>{authority.name}</Text>
                </View>
            </TouchableRipple>
            {(expanded || searching) && (
                <FlatList<UserData>
                    data={authorityEmployees}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    )
}

export default AuthorityEmployeeGroup
