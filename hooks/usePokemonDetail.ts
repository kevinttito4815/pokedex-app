import { useState, useEffect } from 'react';
import {PokemonDetail} from "@/app/models/Pokemon";
import {getPokemonDetail} from "@/app/services/servicePokemonDetail";

export const usePokemonDetail = (name: string) => {
    const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPokemonDetail = async () => {
            setLoading(true);
            setError(null);
            const data = await getPokemonDetail(name);
            if (data) {
                setPokemonDetail(data);
            } else {
                setError('Error al cargar los datos.');
            }
            setLoading(false);
        };

        fetchPokemonDetail();
    }, [name]);

    return { pokemonDetail, loading, error };
};
