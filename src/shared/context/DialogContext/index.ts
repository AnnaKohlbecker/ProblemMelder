import { createContext, useContext } from 'react'

export type DialogInfo = {
    title: string
    description: string
    acceptLabel?: string
    onAccept: () => void
    dismissHidden?: boolean
    dismissLabel?: string
    onDismiss?: () => void
}

type DialogContextProps = {
    setDialogInfo: (dialogInfo: DialogInfo) => void
}

export const DialogContext = createContext<DialogContextProps>({
    setDialogInfo: () => {
        throw new Error('Cannot access the DialogContext outside of its provider')
    },
})

export const useDialog = () => {
    const { setDialogInfo } = useContext(DialogContext)

    return setDialogInfo
}
