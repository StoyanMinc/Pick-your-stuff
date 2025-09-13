import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import Lists from "../components/lists/Lists";
import ListItem from '../components/listItems/ListItem';

const StackNavigator = createNativeStackNavigator<RootStackParamList>();

export default function StackListNavigator() {
    return (
        <StackNavigator.Navigator
            screenOptions={{
                headerTintColor: '#6a0dad',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}>
            <StackNavigator.Screen name="Your Lists" component={Lists} />
            <StackNavigator.Screen name="List" component={ListItem} />
        </StackNavigator.Navigator>
    );
}
