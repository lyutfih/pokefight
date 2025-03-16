import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import database from './config/db.js';
database.connect();

import pokeRouter from './routes/pokeRoute.js';
import leaderboardRouter from './routes/leaderboardRoute.js';

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/pokemon', pokeRouter);
app.use('/api/leaderboard', leaderboardRouter);

// Basic route for testing
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to Pokefight API' });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default async (req, res) => {
  return app(req, res);
};

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running`);
  });
}