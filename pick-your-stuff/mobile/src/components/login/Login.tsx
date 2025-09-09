import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import { useAuth } from '../../hooks/useAuth';
import { styles } from './login.styles';

type AuthStackParamList = {
    Register: undefined;
    'Your lists': undefined;
};

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

    const { login, loading, error } = useAuth();

    const loginHandler = async () => {
        await login({ username, password });
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Please Login</Text>
                </View>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}  // ✅ shifts view on iOS
                >
                    {error && <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={loginHandler}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>LOGIN</Text>
                        )}
                    </TouchableOpacity>
                </KeyboardAvoidingView>
                <Text style={styles.registerText}>
                    Don't have an account?{" "}
                    <Text onPress={() => navigation.navigate('Register')} style={styles.signUpLink}>Register now</Text>
                </Text>
            </View>
        </TouchableWithoutFeedback >
    );
}
