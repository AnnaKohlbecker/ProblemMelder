import { createContext, useContext } from 'react'

type KeyboardContextProps = {
    isKeyboardVisible: boolean
}

export const KeyboardContext = createContext<KeyboardContextProps>({
    isKeyboardVisible: false,
})

export const useKeyboard = () => useContext(KeyboardContext)
