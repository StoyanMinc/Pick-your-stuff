import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, // no headers for auth screens
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    );
}
