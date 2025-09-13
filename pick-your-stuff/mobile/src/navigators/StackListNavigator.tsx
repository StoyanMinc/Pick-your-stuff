import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import Lists from "../components/lists/Lists";
import ListItem from '../components/listItems/ListItem';
import AcceptList from '../components/acceptList/AcceptList';
import DeclineList from '../components/declineList/DeclineList';

// Type the navigator with your param list
const StackNavigator = createNativeStackNavigator<RootStackParamList>();

export default function StackListNavigator() {
    return (
        <StackNavigator.Navigator
            screenOptions={{
                headerTintColor: '#6a0dad',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <StackNavigator.Screen name="Your Lists" component={Lists} />
            <StackNavigator.Screen name="List" component={ListItem} />
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
