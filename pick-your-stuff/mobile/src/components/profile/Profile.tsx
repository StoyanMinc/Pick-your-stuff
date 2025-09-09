import { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";

import { useAuth } from '../../hooks/useAuth';
import { UserContext } from "../../contexts/UserContext";
import { styles } from "./profile.styles";

export default function ProfileScreen() {
    const { logout,
        updateUser,
        changePassword,
        deleteAccount,
        error,
        loading

    } = useAuth();
    const { user } = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [successCtx, setSuccessCtx] = useState<string | null>(null);
    const [loadingButton, setLoadingButton] = useState<null | 'username' | 'password' | 'logout' | 'delete'>(null);

    const logoutHandler = async () => {
        setLoadingButton('logout');
        await logout()
        setLoadingButton(null);
    }
    const updateUserHandler = async () => {
        setLoadingButton('username');
        const result = await updateUser(username);
        if (result) {
            setSuccessCtx('username');
            setTimeout(() => setSuccessCtx(null), 4000);
            setUsername('');
        }
        setLoadingButton(null);
    }
    const changePasswordHandler = async () => {
        setLoadingButton('password');
        const result = await changePassword(currentPassword, newPassword);
        if (result) {
            setSuccessCtx('password');
            setTimeout(() => setSuccessCtx(null), 3000);
            setCurrentPassword('');
            setNewPassword('');
        }
        setLoadingButton(null);
    }
    const deleteAccountHandler = async () => {
        setLoadingButton('delete')
        await deleteAccount();
        setLoadingButton(null);
    }

    const showDeleteConfirmation = () => {
        Alert.alert("Delete Account", "Are you sure you want to delete your account?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => deleteAccountHandler() },
        ]);
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.greeting}>Hello, {user?.username} 👋</Text>

            <View style={styles.section}>
                <Text style={styles.label}>Edit Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Enter new username"
                />
                {successCtx === 'username' && (
                    <Text style={[styles.resultMessage, styles.successMessage]}>Username updated successfully!</Text>
                )}
                {error && error.startsWith('Username') && (
                    <Text style={[styles.resultMessage, styles.errorMessage]}>{error}</Text>
                )}
                <TouchableOpacity
                    style={styles.button}
                    onPress={updateUserHandler}
                >
                    {loading && loadingButton === 'username' ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Save username</Text>
                    )}
                </TouchableOpacity>

            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Change Password</Text>
                <TextInput
                    style={styles.input}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    placeholder="Current Password"
                    secureTextEntry
                />
                {error && error === 'Invalid current password!' && (
                    <Text style={[styles.resultMessage, styles.errorMessage]}>{error}</Text>
                )}
                <TextInput
                    style={styles.input}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="New Password"
                    secureTextEntry
                />
                {successCtx === 'password' && (
                    <Text style={[styles.resultMessage, styles.successMessage]}>Password updated successfully!</Text>
                )}
                {error && error.startsWith('New') && (
                    <Text style={[styles.resultMessage, styles.errorMessage]}>{error}</Text>
                )}
                <TouchableOpacity
                    style={styles.button}
                    onPress={changePasswordHandler}
                    disabled={loading}
                >
                    {loading && loadingButton === 'password' ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Update Password</Text>
                    )}
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[styles.button, styles.logoutButton]}
                onPress={logoutHandler}
                disabled={loading}
            >
                {loading && loadingButton === 'logout' ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Logout</Text>
                )}
            </TouchableOpacity>

            <View style={styles.dangerZone}>
                <Text style={styles.dangerLabel}>Danger Zone</Text>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={showDeleteConfirmation}
                >
                    {loading && loadingButton === 'delete' ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Delete Account</Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}


