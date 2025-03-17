import { Text, StyleSheet, ScrollView, Image, View } from "react-native";
import { Pokemon } from "../models/Pokemon";
import { Link } from 'expo-router';
import { useEffect, useState } from "react";
import axios from 'axios';
import { PokemonDetail } from "../models/Pokemon";

const PokemonCard: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  const [imageUrl,setImageUrl]=useState<string|null>(null);
  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get<PokemonDetail>(pokemon.url);
        setImageUrl(response.data.sprites.front_default);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };

    fetchPokemonDetails();
  }, [pokemon.url]);


  return (
    <Link
      href={{
        pathname: '/components/PokemonDetail',
        params: { name: pokemon.name },
      }}
      style={styles.cardContainer}
    >
      <View style={styles.cardPokemon}>
        <Text style={styles.pokemonName}>{pokemon.name}</Text>
        {imageUrl && (
          <Image source={{ uri: imageUrl }} style={styles.pokemonImage} />
        )}
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  cardPokemon: {
    padding: 5,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: '500',
    color: "#2c3e50",
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  pokemonImage: {
    width: 100,
    height: 100,
  },
});

export default PokemonCard;