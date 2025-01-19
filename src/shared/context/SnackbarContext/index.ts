import { createContext, useContext } from 'react'

export type SnackbarInfo = {
    text: string
}

type SnackbarContextProps = {
    setSnackbarInfo: (snackbarInfo: SnackbarInfo) => void
}

export const SnackbarContext = createContext<SnackbarContextProps>({
    setSnackbarInfo: () => {
        throw new Error('Cannot access the SnackbarContext outside of its provider')
    },
})

export const useSnackbar = () => {
    const { setSnackbarInfo } = useContext(SnackbarContext)

    return setSnackbarInfo
}
