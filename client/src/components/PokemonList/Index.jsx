import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { MagicCard } from "../common/MagicCard";
import { AnimatedSubscribeButton } from "../common/AnimatedButton";
import PokemonStats from "../common/PokemonStats";
import Loading from "../common/Loading";
import { fetchAllPokemon } from "../../utils/api";
import { externalApiClient } from "../../utils/apiUtils";

const PokemonList = () => {
  const theme = "dark";
  const [pokemons, setPokemons] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 24;

  const loadPokemons = async () => {
    try {
      const data = await fetchAllPokemon(limit, offset);
      const { results, hasMore: moreAvailable } = data;

      const pokemonsWithPics = await Promise.all(
        results.map(async (pokemon) => {
          const pokeApiResponse = await externalApiClient.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`
          );
          return {
            ...pokemon,
            image: pokeApiResponse.data.sprites.other.home.front_shiny,
          };
        })
      );

      setPokemons((prevPokemons) => [...prevPokemons, ...pokemonsWithPics]);
      setHasMore(moreAvailable);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  const fetchMoreData = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  useEffect(() => {
    if (offset > 0) {
      loadPokemons();
    }
  }, [offset]);

  return (
    <div id="main" className="container mx-auto py-4">
      <div className="min-w-full">
        <div>
          <InfiniteScroll
            dataLength={pokemons.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Loading />}
            className={
              "grid w-full gap-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 md:gap-6 sm:p-4 max-sm:p-2"
            }
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>No more Pokemons to show!</b>
              </p>
            }
          >
            {pokemons.map((pokemon) => (
              <MagicCard
                key={pokemon.id}
                className="cursor-crosshair flex-col items-center justify-center shadow-2xl whitespace-nowrap text-2xl"
                gradientColor={theme === "dark" ? "#ffffff3d" : "#D9D9D955"}
              >
                {pokemon.name.english}
                <img src={pokemon.image} alt="" />

                <PokemonStats pokemon={pokemon} />
                <Link to={`/battle/${pokemon.id}`}>
                  <AnimatedSubscribeButton
                    buttonColor="#9211119e"
                    buttonTextColor="#ffffff"
                    subscribeStatus={false}
                    pokemon_id={pokemon.id}
                    initialText={
                      <span className="group inline-flex items-center text-base">
                        Battle{" "}
                      </span>
                    }
                    changeText={
                      <span className="group inline-flex items-center text-base">
                        Loading...{" "}
                      </span>
                    }
                  />
                </Link>
              </MagicCard>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
