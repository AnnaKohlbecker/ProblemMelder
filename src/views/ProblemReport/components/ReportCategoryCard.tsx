import { noop } from 'lodash'
import { StyleSheet, View } from 'react-native'
import { Card, Icon, IconButton, Text, TouchableRipple } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'
import { useDialog } from '~/shared/context/DialogContext'
import { ProblemCategory } from '~/shared/models/ProblemCategory'

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 10,
        margin: 10,
    },
    cardContent: {
        aspectRatio: 1,
        borderRadius: 10,
        height: RFValue(80),
        width: RFValue(80),
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
    subtitle: {
        fontSize: RFValue(10),
        fontWeight: 'bold',
        textAlign: 'center',
    },
})

type Props = {
    item: ProblemCategory
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

                    <Text style={styles.subtitle}>{item.title}</Text>
                    <IconButton
                        style={styles.infoButton}
                        icon='information'
                        size={16}
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
