import express from 'express';
import pokemonController from '../controllers/pokeController.js';

class PokemonRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
    return this.router;
  }

  initializeRoutes() {
    this.router.get('/', pokemonController.getAllPokemon.bind(pokemonController));
    
    this.router.get('/:id', pokemonController.getPokemonById.bind(pokemonController));
    
    this.router.get('/:id/:info', pokemonController.getPokemonInfo.bind(pokemonController));
  }
}

export default new PokemonRoutes();