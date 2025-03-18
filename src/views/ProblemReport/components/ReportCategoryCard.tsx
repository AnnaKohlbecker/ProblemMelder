import { noop } from 'lodash'
import { StyleSheet, View } from 'react-native'
import { Card, Icon, IconButton, Text, TouchableRipple } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { useDialog } from '~/shared/context/DialogContext'
import { Category } from '~/supabase/types'

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 10,
        margin: 10,
    },
    cardContent: {
        aspectRatio: 1,
        borderRadius: 10,
        height: RFValue(90),
        width: RFValue(90),
    },
    cardWrapper: {
        alignItems: 'center',
        flex: 1,
        gap: 5,
        justifyContent: 'center',
    },
    current: {
        backgroundColor: colors.secondary,
    },
    infoButton: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
})

type Props = {
    item: Category
    selected: boolean
    onPress: () => void
}

const ReportCategoryCard = ({ item, onPress, selected }: Props) => {
    const showDialog = useDialog()

    return (
        <Card style={[styles.card, selected ? styles.current : undefined]}>
            <TouchableRipple
                key={item.id}
                borderless={true}
                onPress={onPress}
                style={styles.cardContent}
            >
                <View style={styles.cardWrapper}>
                    <Icon
                        size={36}
                        source={item.icon}
                        color={colors.primary}
                    />
                    <Text
                        style={globalStyles.subtitle}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                    >
                        {item.title}
                    </Text>
                    <IconButton
                        style={styles.infoButton}
                        icon='information'
                        size={22}
                        onPress={() => {
                            showDialog({
                                title: item.title,
                                description: item.description,
                                dismissHidden: true,
                                acceptLabel: 'Okay',
                                onAccept: noop,
                            })
                        }}
                    />
                </View>
            </TouchableRipple>
        </Card>
    )
}
export default ReportCategoryCard
