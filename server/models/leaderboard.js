import mongoose from 'mongoose';

class LeaderboardSchema {
  constructor() {
    this.schema = new mongoose.Schema({
      playerName: {
        type: String,
        required: true,
        trim: true
      },
      score: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    });
    
    this.schema.methods.toJSON = function() {
      const obj = this.toObject();
      return obj;
    };
    
    return mongoose.model('Leaderboard', this.schema);
  }
}

export default new LeaderboardSchema(); 