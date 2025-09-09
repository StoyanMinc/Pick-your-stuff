import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { styles } from './register.styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../hooks/useAuth';
type AuthStackParamList = {
    Login: undefined;
};

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repass, setRepass] = useState('');
    const navigate = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const { register, loading, error } = useAuth();

    const registerHandler = async () => {
        await register({ username, password, repass });
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Please Register</Text>
                </View>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="off"
                    textContentType="none"
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="off"
                    textContentType="none"
                />

                <Text style={styles.label}>Repeat your password</Text>
                <TextInput
                    style={styles.input}
                    value={repass}
                    onChangeText={setRepass}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="off"
                    textContentType="none"
                />
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    {error && <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>}
                    <TouchableOpacity style={styles.button} onPress={registerHandler} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>REGISTER</Text>
                        )}
                    </TouchableOpacity>
                </KeyboardAvoidingView>
                <Text style={styles.loginText}>You already have an account?{' '}
                    <Text style={styles.signUpLink} onPress={() => navigate.navigate('Login')}>Login now</Text>
                </Text>
            </View>
        </TouchableWithoutFeedback>

    );
}
