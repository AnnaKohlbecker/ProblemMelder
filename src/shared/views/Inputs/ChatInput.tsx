import { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '~/shared/constants/colors'

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.secondary,
        borderRadius: 30,
        flexDirection: 'row',
        margin: 10,
        paddingLeft: 10,
        paddingVertical: 5,
    },
    disabled: {
        backgroundColor: colors.gray,
        borderColor: colors.black,
    },
    input: {
        flex: 1,
        fontSize: RFValue(12),
        paddingBottom: 8,
        paddingHorizontal: 10,
        paddingTop: 8,
        textAlignVertical: 'center',
    },
})

type Props = {
    pending: boolean
    disabled?: boolean
    onSend: (message: string) => void
}

const ChatInput = ({ pending, disabled = false, onSend }: Props) => {
    const [message, setMessage] = useState('')
    const [height, setHeight] = useState(40)

    const handleSend = () => {
        if (message.trim()) {
            onSend(message.trim())
            setMessage('')
            setHeight(40)
        }
    }

    return (
        <View style={[styles.container, disabled ? styles.disabled : undefined]}>
            <TextInput
                editable={!disabled && !pending}
                value={message}
                onChangeText={setMessage}
                multiline={true}
                onContentSizeChange={(event) => {
                    setHeight(Math.min(120, Math.max(40, event.nativeEvent.contentSize.height)))
                }}
                placeholder={disabled ? 'Bitte anmelden' : 'Kommentar'}
                style={[styles.input, { height }]}
            />
            <IconButton
                icon='send'
                onPress={handleSend}
                loading={pending}
                disabled={pending || disabled || !message.trim()}
            />
        </View>
    )
}

export default ChatInput
