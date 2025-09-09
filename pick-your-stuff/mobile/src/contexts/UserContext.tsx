// contexts/UserContext.ts
import { createContext, useState, ReactNode, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type User = {
  id: string;
  username: string;
};

export type UserContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>; // async because we clear AsyncStorage
};

// ✅ Create a context with default values
export const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => { },
  user: null,
  setUser: () => { },
  logout: async () => { },
});

let externalLogout: (() => Promise<void>) | null = null; // global reference for Axios

export async function globalLogout() {
  if (externalLogout) {
    await externalLogout();
  }
}

// ✅ Provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
    };
    checkToken();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    setUser(null);
    setIsLoggedIn(false);
  };

  // expose logout globally for Axios
  externalLogout = logout;

  return (
    <UserContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      user,
      setUser,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
}