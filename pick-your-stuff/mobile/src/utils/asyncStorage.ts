import AsyncStorage from '@react-native-async-storage/async-storage';
import { userData } from '../types'

export const setUserData = async (data: userData) => {
    const userData: userData | null = data;
    if (userData) {
        await AsyncStorage.setItem('auth', JSON.stringify(userData));
    }
};

export const getUserData = async () => {
    const userData = await AsyncStorage.getItem('auth');
    if (userData) {
        return JSON.parse(userData);
    } else {
        return null;
    }
};

export const removeUserData = async () => {
    return await AsyncStorage.removeItem('auth');
};