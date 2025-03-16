import axios from "axios";
import { fetchPokemonById } from "./api";

export const externalApiClient = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchPokemonData = async (pokemonId) => {
  try {
    const [pokemonResponse, imageResponse] = await Promise.all([
      fetchPokemonById(pokemonId),
      externalApiClient.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`),
    ]);
    return {
      ...pokemonResponse, 
      image: imageResponse.data.sprites.other.home.front_shiny,
    };
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return null;
  }
};