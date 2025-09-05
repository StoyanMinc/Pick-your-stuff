import React, { useContext } from 'react';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { UserContext } from '../contexts/UserContext';

export default function RootNavigator() {
    const { isLoggedIn } = useContext(UserContext);

    return isLoggedIn ? <AppNavigator /> : <AuthNavigator />;
}
