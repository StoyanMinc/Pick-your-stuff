// src/hooks/useAuth.ts
import { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../contexts/UserContext";

type Credentials = {
    email: string;
    password: string;
};

export function useAuth() {
    const { setIsLoggedIn } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async ({ email, password }: Credentials) => {
        try {
            setLoading(true);
            setError(null);

            // const response = await fetch("https://your-api.com/login", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ email, password }),
            // });

            // if (!response.ok) {
            //     throw new Error("Invalid email or password");
            // }

            // const data = await response.json();
            // const token = data.token;
            await new Promise((resolve) => setTimeout(resolve, 1500));
            await AsyncStorage.setItem("token", 'dummy-token');
            setIsLoggedIn(true);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const register = async ({ email, password, repass }: Credentials & { repass: string }) => {
        try {
            setLoading(true);
            setError(null);

            if (password !== repass) {
                throw new Error("Passwords do not match");
            }

            // const response = await fetch("https://your-api.com/register", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ email, password }),
            // });

            // if (!response.ok) {
            //     throw new Error("Registration failed");
            // }

            // const data = await response.json();
            // const token = data.token;
            await new Promise((resolve) => setTimeout(resolve, 1500));

            await AsyncStorage.setItem("token", 'dummy-token');
            setIsLoggedIn(true);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        await AsyncStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return { login, register, logout, loading, error };
}
