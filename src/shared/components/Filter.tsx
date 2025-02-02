import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, Menu } from 'react-native-paper'
import { colors } from '~/shared/constants/colors'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'

type FilterProps = {
    value: ProblemStatus | null
    onChangeFilter: (filter: ProblemStatus | null) => void
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.gray,
        borderRadius: 100,
    },
    menuContent: {
        backgroundColor: colors.white,
        borderRadius: 30,
        marginTop: 30,
        overflow: 'hidden',
    },
})

const getFilterIcon = (filter: ProblemStatus | null) => {
    switch (filter) {
        case null:
            return 'filter-remove'
        case -1:
            return 'cancel'
        case 0:
            return 'alert-circle'
        case 1:
            return 'progress-wrench'
        case 2:
            return 'check-circle'
        default:
            return 'filter'
    }
}

const Filter = ({ value, onChangeFilter }: FilterProps) => {
    const [menuVisible, setMenuVisible] = useState(false)

    const openMenu = () => setMenuVisible(true)
    const closeMenu = () => setMenuVisible(false)

    const handleFilterSelect = (filter: ProblemStatus | null) => {
        onChangeFilter(filter)
        closeMenu()
    }

    return (
        <View style={styles.container}>
            <Menu
                visible={menuVisible}
                onDismiss={closeMenu}
                anchor={
                    <IconButton
                        icon={getFilterIcon(value)}
                        onPress={openMenu}
                        size={24}
                    />
                }
                contentStyle={styles.menuContent}
            >
                <Menu.Item
                    onPress={() => handleFilterSelect(null)}
                    title='Kein Filter'
                    leadingIcon={getFilterIcon(null)}
                />
                <Menu.Item
                    onPress={() => handleFilterSelect(0)}
                    title='Zu Erledigen'
                    leadingIcon={getFilterIcon(0)}
                />
                <Menu.Item
                    onPress={() => handleFilterSelect(1)}
                    title='In Bearbeitung'
                    leadingIcon={getFilterIcon(1)}
                />
                <Menu.Item
                    onPress={() => handleFilterSelect(2)}
                    title='Erledigt'
                    leadingIcon={getFilterIcon(2)}
                />
            </Menu>
        </View>
    )
}

export default Filter
