import { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../contexts/UserContext";
import { api } from "../api/axios";

type Credentials = {
    username: string;
    password: string;
};

export function useAuth() {
    const { setIsLoggedIn, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async ({ username, password }: Credentials) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post("/auth/login", { username, password });

            const { accessToken, refreshToken, _id } = response.data;

            await AsyncStorage.setItem("accessToken", accessToken);
            await AsyncStorage.setItem("refreshToken", refreshToken);

            setIsLoggedIn(true);
            setUser({ id: _id, username: username }); // adjust if backend returns `email`
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const register = async ({
        username,
        password,
        repass,
    }: Credentials & { repass: string }) => {
        if (username.length < 3) return setError("Username must be at least 3 characters long");
        if (password.length < 3) return setError("Password must be at least 3 characters long");
        if (password !== repass) return setError("Passwords do not match");

        setLoading(true);
        setError(null);
        try {
            const response = await api.post("/auth/register", { username, password });
            const { accessToken, refreshToken, _id } = response.data;

            await AsyncStorage.setItem("accessToken", accessToken);
            await AsyncStorage.setItem("refreshToken", refreshToken);

            setIsLoggedIn(true);
            setUser({ id: _id, username: username });
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            const refreshToken = await AsyncStorage.getItem("refreshToken");

            await AsyncStorage.removeItem("accessToken");
            await AsyncStorage.removeItem("refreshToken");

            await api.post("/auth/logout", { refreshToken });
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setIsLoggedIn(false);
            setUser(null);
        }
    };

    const updateUser = async (username: string) => {
        if (username.length < 3) return setError("Username must be at least 3 characters long");
        setLoading(true);
        setError(null);
        try {
            const response = await api.put("/auth/update-user", { username });
            setUser({ id: response.data._id, username: response.data.username });
            return { success: true };
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const changePassword = async (
        currentPassword: string,
        newPassword: string
    ) => {
        if (newPassword.length < 3) return setError("New password must be at least 3 characters long");
        setLoading(true);
        setError(null);
        try {
            await api.put("/auth/change-password", { currentPassword, newPassword });
            return { success: true };
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const deleteAccount = async () => {
        setLoading(true);
        setError(null);
        try {
            await api.delete("/auth/delete-account");
            await logout();
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return {
        login,
        register,
        logout,
        updateUser,
        changePassword,
        deleteAccount,
        loading,
        error
    };
}
