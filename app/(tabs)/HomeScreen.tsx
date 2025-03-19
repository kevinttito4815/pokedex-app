import {
    StyleSheet,
    Text,
    FlatList,
    SafeAreaView,
    Platform,
    StatusBar,
    ScrollView,
    TextInput,
    View,
    ActivityIndicator
} from 'react-native';
import {Pokemon} from '../models/Pokemon';
import {useEffect, useState} from 'react';
import PokemonCard from '../components/CardPokemon';
import {getPokemons} from "@/app/services/servicePokemon";

export default function HomeScreen() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const data = await getPokemons();
            setPokemons(data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const foundPokemons = pokemons.filter(pokemon => pokemon.name.includes(search.toLowerCase()));


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
            {isLoading ? (
                <ActivityIndicator size="large" color="red" style={styles.loader}/>
            ) : (
                <FlatList
                    data={foundPokemons}
                    renderItem={({item}) => (
                        <View style={styles.containerPokemons}>
                            <PokemonCard pokemon={item}/>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                    contentContainerStyle={styles.listContainer}
                />
            )}
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
    },
    loader: {
        marginTop: 20,
    }
});
