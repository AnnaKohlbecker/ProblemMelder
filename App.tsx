import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native'
import { PaperProvider } from 'react-native-paper'
import Main from '~/Main'
import { colors } from '~/shared/constants/colors'
import { globalStyles } from '~/shared/constants/globalStyles'
import { theme } from '~/shared/constants/theme'
import AuthProvider from '~/shared/context/AuthContext/AuthProvider'
import DialogProvider from '~/shared/context/DialogContext/DialogProvider'
import KeyboardProvider from '~/shared/context/KeyboardContext/KeyboardProvider'
import LocationProvider from '~/shared/context/LocationContext/LocationProvider'
import SnackbarProvider from '~/shared/context/SnackbarContext/SnackbarProvider'

const App = () => {
    const throwOnError = (error: Error) => {
        console.error(error)

        return false
    }

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: true,
                throwOnError,
            },
            mutations: {
                throwOnError,
            },
        },
    })

    return (
        <KeyboardProvider>
            <SafeAreaView style={globalStyles.flexBox}>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <PaperProvider theme={theme}>
                            <StatusBar
                                animated
                                style='dark'
                                hidden={false}
                                backgroundColor={colors.white}
                            />
                            <LocationProvider>
                                <DialogProvider>
                                    <SnackbarProvider>
                                        <Main />
                                    </SnackbarProvider>
                                </DialogProvider>
                            </LocationProvider>
                        </PaperProvider>
                    </AuthProvider>
                </QueryClientProvider>
            </SafeAreaView>
        </KeyboardProvider>
    )
}

export default App
