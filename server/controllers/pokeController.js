import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pokedexPath = path.join(__dirname, '..', 'pokedex.json');
const pokedex = JSON.parse(fs.readFileSync(pokedexPath, 'utf8')); 

class PokemonController {
  constructor() {
    this.pokedex = pokedex;
  }

  getAllPokemon(req, res) {
    const limit = parseInt(req.query.limit) || 12;
    const offset = parseInt(req.query.offset) || 0;
    const name = req.query.name || "";

    let filteredPokemons = this.pokedex;

    if (name) {
      filteredPokemons = this.pokedex.filter(pokemon => 
        pokemon.name.english.toLowerCase().includes(name.toLowerCase())
      );
    }

    const paginatedPokemons = filteredPokemons.slice(offset, offset + limit);

    res.json({
      results: paginatedPokemons,
      total: filteredPokemons.length,
      hasMore: offset + paginatedPokemons.length < filteredPokemons.length
    });
  }

  getPokemonById(req, res) {
    const { id } = req.params;
    
    const pokemon = this.pokedex.find(p => p.id === parseInt(id));
    
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    
    res.json(pokemon);
  }

  getPokemonInfo(req, res) {
    const { id, info } = req.params;
    
    const pokemon = this.pokedex.find(p => p.id === parseInt(id));
    
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }

    if (!pokemon[info]) {
      return res.status(400).json({ error: 'Invalid info requested' });
    }
    
    res.json(pokemon[info]);
  }
}

export default new PokemonController();

