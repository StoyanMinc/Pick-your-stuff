import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import { UserContext, UserProvider } from "./src/contexts/UserContext";
import { navigationRef } from "./src/navigators/RootNavigatorRef";
import RootNavigator from "./src/navigators/RootNavigator";
import { getUserData } from "./src/utils/asyncStorage";

function AppContent() {
    const [isLoading, setIsLoading] = useState(true);
    const { setUser, setIsLoggedIn } = useContext(UserContext);

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
        <NavigationContainer ref={navigationRef}>
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
