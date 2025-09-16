import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import SharedLists from '../components/sharedLists/SharedLists';
import SharedListItem from '../components/sharedListItems/SharedListItem';
import AcceptList from '../components/acceptList/AcceptList';
import DeclineList from '../components/declineList/DeclineList';

const StackNavigator = createNativeStackNavigator<RootStackParamList>();

export default function StackSharedListNavigator() {
    return (
        <StackNavigator.Navigator
            screenOptions={{
                headerTintColor: '#6a0dad',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <StackNavigator.Screen name="Shared Lists" component={SharedLists} />
            <StackNavigator.Screen name="SharedListItem" component={SharedListItem} />
            <StackNavigator.Screen
                name="AcceptList"
                component={AcceptList}
                options={{ headerShown: false }}
            />
            <StackNavigator.Screen
                name="DeclineList"
                component={DeclineList}
                options={{ headerShown: false }}
            />
        </StackNavigator.Navigator>
    );
}
