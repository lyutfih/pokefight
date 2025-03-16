const PokemonStats = ({ pokemon }) => {
  return (
    <>
      <div className="flex items-center w-full">
        <div className="border-t border-1 border-gray-400 flex-grow"></div>
        <div className="px-3 text-gray-200 font-medium text-base">Stats</div>
        <div className="border-t border-1 border-gray-400 flex-grow"></div>
      </div>
      <div className="flex justify-between w-full">
        <div>
          <div className="text-gray-400 font-semibold text-sm">HP</div>
          <div className="text-gray-200 font-semibold text-sm">
            {pokemon.base.HP}
          </div>
        </div>
        <div>
          <div className="text-gray-400 font-semibold text-sm">ATK</div>
          <div className="text-gray-200 font-semibold text-sm">
            {pokemon.base.Attack}
          </div>
        </div>
        <div>
          <div className="text-gray-400 font-semibold text-sm">DEF</div>
          <div className="text-gray-200 font-semibold text-sm">
            {pokemon.base.Defense}
          </div>
        </div>
        <div>
          <div className="text-gray-400 font-semibold text-sm">SPA</div>
          <div className="text-gray-200 font-semibold text-sm">
            {pokemon.base["Sp. Attack"]}
          </div>
        </div>
        <div>
          <div className="text-gray-400 font-semibold text-sm">SPD</div>
          <div className="text-gray-200 font-semibold text-sm">
            {pokemon.base["Sp. Defense"]}
          </div>
        </div>
      </div>
    </>
  );
};
export default PokemonStats;
