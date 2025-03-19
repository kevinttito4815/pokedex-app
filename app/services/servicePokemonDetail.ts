import axios from 'axios';
import { PokemonDetail } from '../models/Pokemon';

export const getPokemonDetail = async (name: string): Promise<PokemonDetail | null> => {
    try {
        const response = await axios.get<PokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${name}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el detalle del Pokémon', error);
        return null;
    }
};
