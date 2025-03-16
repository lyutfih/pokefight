import { useState, useEffect } from "react";
import { fetchPokemonData } from "../utils/apiUtils";

const usePokemon = (id) => {
  const [pokemon, setPokemon] = useState(null);
  const [opponent, setOpponent] = useState(null);

  useEffect(() => {
    const loadPokemon = async () => {
      const pokemonData = await fetchPokemonData(id);
      if (pokemonData) {
        setPokemon(pokemonData);
      }
    };
    loadPokemon();
  }, [id]);

  const loadNewOpponent = async () => {
    const opponentId = Math.floor(Math.random() * 809) + 1;
    const opponentData = await fetchPokemonData(opponentId);
    if (opponentData) {
      setOpponent(opponentData);
    }
  };

  useEffect(() => {
    loadNewOpponent();
  }, []);

  return { pokemon, opponent, loadNewOpponent };
};

export default usePokemon;