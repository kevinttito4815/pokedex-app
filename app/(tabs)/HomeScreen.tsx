import { StyleSheet, Text, FlatList, SafeAreaView, Platform, StatusBar, ScrollView } from 'react-native';
import { Pokemon, PokemonResponse } from '../models/Pokemon';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PokemonCard from '../components/CardPokemon';

const POKEMONS_URL = 'https://pokeapi.co/api/v2/pokemon?limit=50';

export default function HomeScreen() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const obtenerPokemons = async () => {
      try {
        const response = await axios.get<PokemonResponse>(POKEMONS_URL);
        setPokemons(response.data.results);
      } catch (error) {
        console.error('Error al obtener Pokémon:', error);
      }
    };

    obtenerPokemons();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Pokemones</Text>
        {pokemons.map((pokemon, index) => (
          <PokemonCard key={index.toString()} pokemon={pokemon} />
        ))}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginInline: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  button: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
});
