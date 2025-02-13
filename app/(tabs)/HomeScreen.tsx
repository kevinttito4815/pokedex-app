import { StyleSheet, Text, FlatList, SafeAreaView, Platform, StatusBar, ScrollView, TextInput } from 'react-native';
import { Pokemon, PokemonResponse } from '../models/Pokemon';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PokemonCard from '../components/CardPokemon';

const POKEMONS_URL = 'https://pokeapi.co/api/v2/pokemon?limit=50';

export default function HomeScreen() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search,setSearch]=useState('');
  const foundPokemons=pokemons.filter(pokemon=>pokemon.name.includes(search.toLowerCase()));


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
        <TextInput 
        placeholder='Ingrese el nombre del Pokémon'
        value={search} 
        onChangeText={setSearch}
        style={styles.input}/>
        {foundPokemons.map((pokemon, index) => (
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
  input:{
    borderWidth:0.5,
    borderRadius:5,
    padding:10,
    borderColor:'gray',
    margin:10,
  }
});
