import Leaderboard from '../models/leaderboard.js';

class LeaderboardController {

  async getLeaderboard(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const leaderboard = await Leaderboard.find()
        .sort({ score: -1 })
        .limit(limit);
      
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async saveScore(req, res) {
    try {
      const { playerName, score } = req.body;
      
      if (!playerName || !score) {
        return res.status(400).json({ message: 'Player name and score are required' });
      }
      
      const newScore = new Leaderboard({
        playerName,
        score
      });
      
      const savedScore = await newScore.save();
      res.status(201).json(savedScore);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new LeaderboardController(); 