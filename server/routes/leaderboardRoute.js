import express from 'express';
import leaderboardController from '../controllers/leaderboardController.js';

class LeaderboardRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
    return this.router;
  }

  initializeRoutes() {
    this.router.get('/', leaderboardController.getLeaderboard.bind(leaderboardController));
    
    this.router.post('/', leaderboardController.saveScore.bind(leaderboardController));
  }
}

export default new LeaderboardRoutes(); 