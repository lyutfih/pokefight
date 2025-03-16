import axios from 'axios';

// Get the API base URL using window.location.origin
const API_BASE_URL = `${window.location.origin}/api`;

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request/response interceptors for debugging in development
if (import.meta.env.DEV) {
  api.interceptors.request.use(
    config => {
      console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
      return config;
    },
    error => {
      console.error('API Request Error:', error);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    response => {
      console.log('API Response:', response.status);
      return response;
    },
    error => {
      console.error('API Response Error:', error.response?.status, error.message);
      return Promise.reject(error);
    }
  );
}

// Pokemon API calls
export const fetchAllPokemon = async (limit = 12, offset = 0, name = '') => {
  try {
    const response = await api.get('/pokemon', {
      params: { limit, offset, name }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    throw error;
  }
};

export const fetchPokemonById = async (id) => {
  try {
    const response = await api.get(`/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Pokemon with ID ${id}:`, error);
    throw error;
  }
};

// Leaderboard API calls
export const fetchLeaderboard = async (limit = 10) => {
  try {
    const response = await api.get('/leaderboard', {
      params: { limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};

export const saveScore = async (playerName, score) => {
  try {
    const response = await api.post('/leaderboard', {
      playerName,
      score
    });
    return response.data;
  } catch (error) {
    console.error('Error saving score:', error);
    throw error;
  }
};

export default api; 