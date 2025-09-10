import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootNavigator from './src/navigators/RootNavigator';
import { UserProvider } from "./src/contexts/UserContext";
import { navigationRef } from './src/navigators/RootNavigatorRef'; 

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
            const token = await AsyncStorage.getItem('accessToken');
            setIsLoggedIn(!!token);
            setIsLoading(false);
        };
        checkLogin();
    }, []);
    if (isLoading) return null;
    return (
        <UserProvider>
            <NavigationContainer ref={navigationRef}>
                <RootNavigator />
            </NavigationContainer>
        </UserProvider>
    );
}