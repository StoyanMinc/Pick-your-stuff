import { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
    id: string;
    email: string;
    name?: string;
};

type UserContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    user: User | null;
    setUser: (user: User | null) => void;
};

export const UserContext = createContext<UserContextType>({
    isLoggedIn: false,
    setIsLoggedIn: () => { },
    user: null,
    setUser: () => { },
});

export function UserProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem("token");
            setIsLoggedIn(!!token);
        };
        checkToken();
    }, []);

    return (
        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
