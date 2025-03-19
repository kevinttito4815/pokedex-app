import axios from 'axios';
import { Pokemon, PokemonResponse } from '../models/Pokemon';

const POKEMONS_URL = 'https://pokeapi.co/api/v2/pokemon?limit=99';

export const getPokemons = async (): Promise<Pokemon[]> => {
    try {
        const response = await axios.get<PokemonResponse>(POKEMONS_URL);
        return response.data.results;
    } catch (error) {
        console.error('Error al obtener Pokémon:', error);
        return [];
    }
};
