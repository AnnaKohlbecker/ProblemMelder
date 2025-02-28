import { useCallback, useMemo, useState } from 'react'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { Icon, Text, TouchableRipple } from 'react-native-paper'
import { Authority } from '~/shared/models/Authority'
import { UserData } from '~/shared/models/UserData'
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
    onDelete: (item: UserData) => void
    authority: Authority
    employees: UserData[]
    searching: boolean
}

const AuthorityEmployeeGroup = ({ onDelete, authority, employees, searching }: Props) => {
    const [expanded, setExpanded] = useState(false)

    const authorityEmployees = useMemo(
        () => employees.filter((employee) => employee.authorityId === authority.id),
        [authority.id, employees],
    )

    const renderItem = useCallback<ListRenderItem<UserData>>(
        ({ item }) => {
            return (
                <EmployeeListItem
                    item={item}
                    onDelete={onDelete}
                />
            )
        },
        [onDelete],
    )

    // Don't show anything if no employees are found
    if (authorityEmployees.length === 0) return null

    return (
        <View style={styles.content}>
            <TouchableRipple onPress={() => setExpanded(!expanded)}>
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
