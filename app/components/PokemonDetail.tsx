import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import {usePokemonDetail} from "@/hooks/usePokemonDetail";

const PokemonDetails = () => {
    const { name } = useLocalSearchParams();
    const { pokemonDetail, loading, error } = usePokemonDetail(name as string);

    if (loading) {
        return <ActivityIndicator size="large" color="red" style={styles.loader} />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    if (!pokemonDetail) {
        return <Text>No se encontró el Pokémon {name}</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{pokemonDetail.name.toUpperCase()}</Text>
                <Image
                    source={{ uri: pokemonDetail.sprites.other.home.front_default }}
                    style={styles.image}
                />
                <View style={styles.details}>
                    <View style={styles.typeContainer}>
                        {pokemonDetail.types.map((type) => (
                            <Text key={type.type.name} style={styles.typeTag}>
                                {type.type.name.toUpperCase()}
                            </Text>
                        ))}
                    </View>
                    <Text style={styles.stat}>Altura: {pokemonDetail.height / 10} m</Text>
                    <Text style={styles.stat}>Peso: {pokemonDetail.weight / 10} kg</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 15,
        borderRadius: 10,
    },
    details: {
        width: '100%',
        alignItems: 'center',
    },
    typeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 15,
    },
    typeTag: {
        backgroundColor: '#95a5a6',
        color: 'white',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        fontSize: 14,
        fontWeight: 'bold',
    },
    stat: {
        fontSize: 16,
        marginBottom: 5,
        color: '#666',
    },
    loader: {
        marginTop: 20,
    },
});

export default PokemonDetails;
