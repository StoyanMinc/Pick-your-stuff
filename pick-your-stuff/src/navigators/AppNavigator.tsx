import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons';
import StackListNavigator from "./StackListNavigator";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#6a0dad',
                tabBarInactiveTintColor: '#b88ced',
                tabBarStyle: {
                    backgroundColor: '#f2f2f7',
                    borderTopWidth: 0,
                    elevation: 10,
                    height: 85,
                    paddingBottom: 15,
                    paddingTop: 10,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                },
                headerStyle: {
                    height: 85

                },
                headerTintColor: '#6a0dad',
            }}
        >
            <Tab.Screen
                name="Home"
                component={() => null}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size + 4} color={color} /> // slightly bigger icon
                    ),
                }}
            />
            <Tab.Screen
                name="Your Lists"
                component={StackListNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list" size={size + 4} color={color} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Profile"
                component={() => null}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size + 4} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>

    );
}