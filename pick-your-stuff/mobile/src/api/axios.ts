// utils/api.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';
const SERVER_URL = Constants.expoConfig?.extra?.SERVER_URL;

// import { navigationRef, navigate } from "../navigators/RootNavigatorRef";
import { globalLogout } from "../contexts/UserContext";

interface AxiosRequestConfigWithRetry extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

export const api = axios.create({
    baseURL: SERVER_URL,
});

// 🔹 Request interceptor
api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        console.log(SERVER_URL);
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (accessToken) {
            config.headers = config.headers ?? {};
            // ✅ Assign directly, compatible with React Native
            (config.headers as Record<string, string>)["authorization"] = accessToken;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 🔹 Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfigWithRetry;
        const status = error.response?.status;
        const message = (error.response?.data as any)?.message;

        if (
            status === 401 &&
            message === "Access token expired" &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken = await AsyncStorage.getItem("refreshToken");
                if (!refreshToken) throw new Error("No refresh token");

                const response = await axios.post(`${SERVER_URL}/auth/refresh-tokens`, { refreshToken });
                const { accessToken, refreshToken: newRefreshToken } = response.data;

                await AsyncStorage.setItem("accessToken", accessToken);
                await AsyncStorage.setItem("refreshToken", newRefreshToken);

                originalRequest.headers = originalRequest.headers ?? {};
                (originalRequest.headers as Record<string, string>)["authorization"] = accessToken;

                return api(originalRequest);
            } catch (err) {
                //  ✅ Clear tokens and let RootNavigator handle redirect
                // await AsyncStorage.removeItem("accessToken");
                // await AsyncStorage.removeItem("refreshToken");
                await globalLogout(); // safe to call outside React
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

