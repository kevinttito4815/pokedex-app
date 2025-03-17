import { StyleSheet, Text, FlatList, SafeAreaView, Platform, StatusBar, ScrollView, TextInput, View } from 'react-native';
import { Pokemon, PokemonResponse } from '../models/Pokemon';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PokemonCard from '../components/CardPokemon';

const POKEMONS_URL = 'https://pokeapi.co/api/v2/pokemon?limit=99';

export default function HomeScreen() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState('');
  const foundPokemons = pokemons.filter(pokemon => pokemon.name.includes(search.toLowerCase()));

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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pokedex</Text>
      <TextInput
        placeholder='Ingrese el nombre del Pokémon'
        value={search}
        onChangeText={setSearch}
        style={styles.input}
        placeholderTextColor={'black'}
      />
      <FlatList
        data={foundPokemons}
        renderItem={({ item }) => (
          <View style={styles.containerPokemons}>
            <PokemonCard pokemon={item} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3} 
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
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
  input: {
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 15,
    borderColor: 'black',
    margin: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  containerPokemons: {
    width: "33.3%", 
  }
});
