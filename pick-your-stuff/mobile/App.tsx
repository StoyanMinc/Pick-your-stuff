import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import { UserContext, UserProvider } from "./src/contexts/UserContext";
import { navigationRef } from "./src/navigators/RootNavigatorRef";
import RootNavigator from "./src/navigators/RootNavigator";
import { getUserData } from "./src/utils/asyncStorage";
import * as Linking from "expo-linking";
function AppContent() {
    const [isLoading, setIsLoading] = useState(true);
    const { setUser, setIsLoggedIn } = useContext(UserContext);

    const prefix = Linking.createURL('/');
    const linking = {
        prefixes: [prefix, 'pickyourstuff://'],
        config: {
            screens: {
                Home: 'Home',
                Profile: 'profile',
                Login: 'login',
                Register: 'register',
                "Your Lists": {
                    path: 'lists',
                    screens: {
                        "Your Lists": '',
                        List: ':id',
                    },
                },
                "Shared Lists": {
                    path: 'shared-list',
                    screens: {
                        List: ':id',
                        AcceptList: 'accept/:token',
                        DeclineList: 'decline/:token',
                        "Shared Lists": '',
                    },
                },
            },
        },
    };

    useEffect(() => {
        const checkLogin = async () => {
            const userData = await getUserData();
            if (userData) {
                setUser(userData);
                setIsLoggedIn(true);
            }
            setIsLoading(false);
        };
        checkLogin();
    }, []);

    if (isLoading) return null;

    return (
        <NavigationContainer ref={navigationRef} linking={linking}>
            <RootNavigator />
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <UserProvider>
            <AppContent />
        </UserProvider>
    );
}
