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
            <Text style={styles.title}>{pokemonDetail.name.toUpperCase()}</Text>
            <Image
                source={{ uri: pokemonDetail.sprites.front_default }}
                style={styles.image}
            />
            <View style={styles.details}>
                <Text>
                    Tipo:{' '}
                    {pokemonDetail.types.map((type) => type.type.name).join(', ')}
                </Text>
                <Text>Altura: {pokemonDetail.height / 10} m</Text>
                <Text>Peso: {pokemonDetail.weight / 10} kg</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    image: {
        width: 400,
        height: 200,
        marginBottom: 10,
    },
    details: {
        alignItems: 'flex-start',
    },
});

export default PokemonDetails;