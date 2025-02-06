import { NavigationContainer } from '@react-navigation/native'
import StackNavigation from '~/shared/views/Navigation/components/StackNavigation'

const Navigation = () => {
    return (
        <NavigationContainer>
            <StackNavigation />
        </NavigationContainer>
    )
}

export default Navigation
