import React from "react";
import HealthBar from "./HealthBar";
import { MagicCard } from "../common/MagicCard";
import PokemonStats from "../common/PokemonStats";

const PokemonCard = ({ pokemon, hp, maxHp, isPlayer }) => {
  const theme = "dark";
  return (
    <MagicCard
      key={pokemon.id}
      className="cursor-crosshair flex-col items-center justify-center shadow-2xl whitespace-nowrap text-2xl"
      gradientColor={theme === "dark" ? "#ffffff3d" : "#D9D9D955"}
    >
      <h2 className="text-2xl font-semibold mb-4">
        {isPlayer ? "Your Pokémon: " : "Opponent: "}
        {pokemon.name.english}
      </h2>
      <img
        src={pokemon.image}
        alt={pokemon.name.english}
        className="mx-auto mb-4 size-48"
      />
      <HealthBar current={hp} max={maxHp} />
      <p className="text-center mb-2">
        {hp} / {maxHp} HP
      </p>
      <PokemonStats pokemon={pokemon} />
    </MagicCard>
  );
};

export default PokemonCard;
