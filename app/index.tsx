import { View, StyleSheet, Text, TextInput } from "react-native";
import { Link } from 'expo-router';

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido a la pokedex!</Text>
            <TextInput placeholder="username" style={styles.textInput}></TextInput>
            <TextInput placeholder="password" style={styles.textInput}></TextInput>
            <Link href='/(tabs)/HomeScreen'>Log in</Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textInput: {
        width: 300,
        borderWidth: 0.5,
        borderRadius: 5,
        margin: 5,
        padding: 10,
    }
});