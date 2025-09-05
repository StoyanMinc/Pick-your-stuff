import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './register.styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../hooks/useAuth';
type AuthStackParamList = {
    Login: undefined;
};

export default function Register({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repass, setRepass] = useState('');
    const navigate = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const { register, loading, error } = useAuth();

    const registerHandler = async () => {
        await register({ email, password, repass });
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Please Register</Text>
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

            <Text style={styles.label}>Repeat your password</Text>
            <TextInput
                style={styles.input}
                value={repass}
                onChangeText={setRepass}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={registerHandler} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>REGISTER</Text>
                )}
            </TouchableOpacity>
            {error && (
                <Text style={{ color: "red", marginTop: 12, textAlign: "center" }}>
                    {error}
                </Text>
            )}
            
            <Text style={styles.loginText}>You already have an account?{' '}
                <Text style={styles.signUpLink} onPress={() => navigate.navigate('Login')}>Login now</Text>
            </Text>
        </View>
    );
}
