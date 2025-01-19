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
import SnackbarProvider from '~/shared/context/SnackbarContext/SnackbarProvider'

const App = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: true,
            },
        },
    })

    return (
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
                        <DialogProvider>
                            <SnackbarProvider>
                                <Main />
                            </SnackbarProvider>
                        </DialogProvider>
                    </PaperProvider>
                </AuthProvider>
            </QueryClientProvider>
        </SafeAreaView>
    )
}

export default App
