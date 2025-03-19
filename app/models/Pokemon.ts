export interface Pokemon {
    name: string;
    url: string;
    imageUrl?:string;
}

export interface PokemonResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[]
}

export interface PokemonDetail {
    name: string;
    sprites: {
        front_default: string;
        other:{
            home:{
                front_default:string;
            }
        }
    };
    types: {
        type: {
            name: string;
        };
    }[];
    height: number;
    weight: number;
}
