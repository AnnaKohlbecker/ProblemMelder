import { useCallback, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, Menu } from 'react-native-paper'
import { colors } from '~/shared/constants/colors'
import { ProblemStatus } from '~/shared/enums/ProblemStatus'
import { problemStatusToIconAndColor } from '~/shared/helpers/ProblemStatusToIconAndColor'

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

type FilterProps = {
    value: ProblemStatus | null
    onChangeFilter: (filter: ProblemStatus | null) => void
}

const Filter = ({ value, onChangeFilter }: FilterProps) => {
    const [menuVisible, setMenuVisible] = useState(false)

    const openMenu = useCallback(() => setMenuVisible(true), [])
    const closeMenu = useCallback(() => setMenuVisible(false), [])

    const handleFilterSelect = useCallback(
        (filter: ProblemStatus | null) => {
            onChangeFilter(filter)
            closeMenu()
        },
        [onChangeFilter, closeMenu],
    )

    const currentIconAndColor = useMemo(() => problemStatusToIconAndColor(value), [value])

    const renderedMenuItems = useMemo(() => {
        const menuItems = [
            { filter: null, title: 'Kein Filter' },
            { filter: -1, title: 'Deaktiviert' },
            { filter: 0, title: 'Zu Erledigen' },
            { filter: 1, title: 'In Bearbeitung' },
            { filter: 2, title: 'Erledigt' },
        ]
        return menuItems.map(({ filter, title }) => (
            <Menu.Item
                key={title}
                onPress={() => handleFilterSelect(filter)}
                title={title}
                leadingIcon={problemStatusToIconAndColor(filter).icon}
            />
        ))
    }, [handleFilterSelect])

    return (
        <View style={styles.container}>
            <Menu
                visible={menuVisible}
                onDismiss={closeMenu}
                anchor={
                    <IconButton
                        icon={currentIconAndColor.icon}
                        onPress={openMenu}
                        size={24}
                        iconColor={colors.black}
                    />
                }
                contentStyle={styles.menuContent}
            >
                {renderedMenuItems}
            </Menu>
        </View>
    )
}

export default Filter
