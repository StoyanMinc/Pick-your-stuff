import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Lists from "../components/lists/Lists";
import ListItem from '../components/item/ListItem';

const StackNavigator = createNativeStackNavigator();

export default function StackListNavigator() {
    return (
        <StackNavigator.Navigator
            screenOptions={{
                headerTintColor: '#6a0dad',         // white text/icons
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <StackNavigator.Screen name="Your Lists" component={Lists} />
            <StackNavigator.Screen name="List" component={ListItem} />
        </StackNavigator.Navigator>

    );
}