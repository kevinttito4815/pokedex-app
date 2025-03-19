import { View, StyleSheet, Text, TextInput, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image } from "react-native";
import { Link, router } from 'expo-router';
import { useState } from 'react';

export interface User{
    username:string;
    password:string;
    name:string;
    email?:string;
}

export const mainUser:User={
    username:'admin',
    password:'123456',
    name:'Kevin Ttito',
    email:'kevin_ttito@gmail.com'
}

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username === mainUser.username && password === mainUser.password) {
            router.replace('/(tabs)/HomeScreen');
            Alert.alert('Inicio de sesión exitoso', 'Bienvenido a la Pokédex', [{ text: 'OK' }]);
        } else {
            Alert.alert(
                'Error de inicio de sesión',
                'Usuario o contraseña incorrectos',
                [{ text: 'OK' }]
            );
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.title}>¡Bienvenido a la Pokédex!</Text>
                <TextInput
                    placeholder="Usuario"
                    style={styles.textInput}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Contraseña"
                    style={styles.textInput}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                >
                    <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    textInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        margin: 10,
        padding: 15,
        backgroundColor: 'white',
    },
    loginButton: {
        backgroundColor: '#4CAF50',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
