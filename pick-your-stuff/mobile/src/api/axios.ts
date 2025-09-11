import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Constants from "expo-constants";
import { globalLogout } from "../contexts/UserContext";
import { getUserData, setUserData } from "../utils/asyncStorage";

const SERVER_URL = Constants.expoConfig?.extra?.SERVER_URL;

interface AxiosRequestConfigWithRetry extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

export const api = axios.create({
    baseURL: SERVER_URL,
});

api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const userData = await getUserData();
        if (userData?.accessToken) {
            config.headers = config.headers || {};
            (config.headers as any).set?.("authorization", userData.accessToken);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

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
                const userData = await getUserData();
                if (!userData?.refreshToken) throw new Error("No refresh token");

                const response = await axios.post(`${SERVER_URL}/auth/refresh-tokens`, {
                    refreshToken: userData.refreshToken,
                });

                const { accessToken, refreshToken: newRefreshToken } = response.data;

                await setUserData({
                    _id: userData._id,
                    username: userData.username,
                    email: userData.email,
                    accessToken,
                    refreshToken: newRefreshToken,
                });

                if (originalRequest.headers) {
                    (originalRequest.headers as any).set?.("authorization", accessToken);
                } else {
                    originalRequest.headers = { authorization: accessToken } as any;
                }

                return api(originalRequest);
            } catch (err) {
                await globalLogout();
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);



