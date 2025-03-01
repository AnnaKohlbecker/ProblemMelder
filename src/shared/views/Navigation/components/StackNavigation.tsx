import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Route } from '~/shared/enums/Route'
import TabNavigation from '~/shared/views/Navigation/components/TabNavigation'
import { NavigationParamList } from '~/shared/views/Navigation/types/NavigationParamList'
import Authentication from '~/views/Authentication'
import Archive from '~/views/Management/Archive'
import AuthoritiesManagement from '~/views/Management/Authorities'
import CategoriesManagement from '~/views/Management/Categories'
import EmployeeManagement from '~/views/Management/Employees'
import ProblemReport from '~/views/ProblemReport'

const StackNavigation = () => {
    const Stack = createNativeStackNavigator<NavigationParamList>()

    return (
        <Stack.Navigator initialRouteName={Route.MAIN}>
            {/* Tab Navigation */}
            <Stack.Screen
                name={Route.MAIN}
                component={TabNavigation}
                options={{ headerShown: false }}
            />

            {/* Authentication */}
            <Stack.Screen
                name={Route.AUTHENTICATION}
                component={Authentication}
                options={{ headerShown: false }}
            />

            {/* Problem Report Popup */}
            <Stack.Screen
                name={Route.PROBLEM_REPORT}
                component={ProblemReport}
                options={{ headerShown: false }}
            />

            {/* Management Views */}
            <Stack.Screen
                name={Route.AUTHORITIES_MANAGEMENT}
                component={AuthoritiesManagement}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={Route.CATEGORIES_MANAGEMENT}
                component={CategoriesManagement}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={Route.EMPLOYEES_MANAGEMENT}
                component={EmployeeManagement}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={Route.ARCHIVE}
                component={Archive}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
export default StackNavigation
