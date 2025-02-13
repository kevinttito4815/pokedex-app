import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { PokemonDetail } from '../models/Pokemon';

const PokemonDetails = () => {
    const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { name } = useLocalSearchParams();
    useEffect(() => {
        const getPokemonDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                setPokemonDetail(response.data);
            } catch (error) {
                console.error('Error al obtener el detalle del pokemon', error);
                setError('Error al cargar los datos.');
            } finally {
                setLoading(false);
            }
        };

        getPokemonDetail();
    }, [name]);

    if (loading) {
        return <Text>Cargando...</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    if (!pokemonDetail) {
        return <Text>No se encontró el pokemon {name}</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{pokemonDetail.name.toUpperCase()}</Text>
                <Image
                    source={{ uri: pokemonDetail.sprites.front_default }}
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
        shadowOffset: {
            width: 0,
            height: 2,
        },
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
});

export default PokemonDetails;