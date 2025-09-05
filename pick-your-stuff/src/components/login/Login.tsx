import { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './login.styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserContext } from '../../contexts/UserContext';
import { useAuth } from '../../hooks/useAuth';

type AuthStackParamList = {
    Register: undefined;
    'Your lists': undefined;
};



export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

    const { login, loading, error } = useAuth();

    const loginHandler = async () => {
        await login({ email, password });
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Please Login</Text>
            </View>
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"

            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {error && <Text style={{ color: "red" }}>{error}</Text>}

            <TouchableOpacity style={styles.button} onPress={loginHandler} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>LOGIN</Text>
                )}
            </TouchableOpacity>

            <Text style={styles.registerText}>
                Don't have an account?{" "}
                <Text onPress={() => navigation.navigate('Register')} style={styles.signUpLink}>Register now</Text>
            </Text>
        </View>
    );
}
