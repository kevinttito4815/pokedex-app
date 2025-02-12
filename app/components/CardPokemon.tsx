import { Text, StyleSheet, ScrollView } from "react-native";
import { Pokemon } from "../models/Pokemon";
import { Link } from 'expo-router';

const PokemonCard: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {

  return (
    <ScrollView>
      <Link href={{
        pathname: '/components/PokemonDetail',
        params: { name: pokemon.name }
      }}
        style={styles.cardPokemon}
      >
        <Text style={styles.pokemonName}>{pokemon.name}</Text>
      </Link>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containter: {
    flexGrow: 1,
    paddingHorizontal: 16, // Ajusta los márgenes laterales
  },
  cardPokemon: {
    padding: 12,
    backgroundColor: "#F7D4BC",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderRadius: 8,
    marginVertical: 4,
    marginBlock: 10,
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    textAlign: 'center'
  }
});

export default PokemonCard;