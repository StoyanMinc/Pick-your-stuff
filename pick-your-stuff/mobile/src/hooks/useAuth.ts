import axios from 'axios';
import Constants from 'expo-constants';
const SERVER_URL = Constants.expoConfig?.extra?.SERVER_URL;

import { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserContext } from "../contexts/UserContext";

type Credentials = {
    username: string;
    password: string;
};

export function useAuth() {
    const { setIsLoggedIn } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async ({ username, password }: Credentials) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.post(`${SERVER_URL}/auth/login`, { username, password });
    
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            await AsyncStorage.setItem("accessToken", accessToken);
            await AsyncStorage.setItem("refreshToken", refreshToken);

            setIsLoggedIn(true);
        } catch (err: any) {
            setError(err.response.data.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const register = async ({ username, password, repass }: Credentials & { repass: string }) => {
        try {
            setLoading(true);
            setError(null);

            if (password !== repass) {
                return setError("Passwords do not match");
            }
            const response = await axios.post(`${SERVER_URL}/auth/register`, { username, password });
            await AsyncStorage.setItem("accessToken", response.data.accessToken);
            await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
            setIsLoggedIn(true);
        } catch (err: any) {
            setError(err.response.data.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {

        const refreshToken = await AsyncStorage.getItem("refreshToken");
        try {
            await AsyncStorage.removeItem("accessToken");
            await AsyncStorage.removeItem("refreshToken");
            await axios.post(`${SERVER_URL}/auth/logout`, { refreshToken });

        } catch (error) {
            console.error("Logout error:", error);
        }
        setIsLoggedIn(false);
    };

    return { login, register, logout, loading, error };
}
