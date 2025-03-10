import { PropsWithChildren, useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import { KeyboardContext } from '~/shared/context/KeyboardContext'

type Props = PropsWithChildren

const KeyboardProvider = ({ children }: Props) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false)

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true)
        })

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false)
        })

        return () => {
            keyboardDidShowListener.remove()
            keyboardDidHideListener.remove()
        }
    }, [])

    return (
        <KeyboardContext.Provider value={{ isKeyboardVisible }}>
            {children}
        </KeyboardContext.Provider>
    )
}

export default KeyboardProvider
