import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Route } from '~/shared/enums/Route'
import TabNavigation from '~/shared/views/Navigation/components/TabNavigation'
import { NavigationParamList } from '~/shared/views/Navigation/types/NavigationParamList'
import ProblemReport from '~/views/ProblemReport'

const StackNavigation = () => {
    const Stack = createNativeStackNavigator<NavigationParamList>()

    return (
        <Stack.Navigator initialRouteName={Route.MAIN}>
            <Stack.Screen
                name={Route.MAIN}
                component={TabNavigation}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={Route.PROBLEM_REPORT}
                component={ProblemReport}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
export default StackNavigation
