import { api } from './api';

export interface Game {
  id: string;
  title: string;
  developer: string;
  description: string;
  releaseYear: number;
  coverImageUrl?: string;
  genre?: string;
  platform?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGameInput {
  title: string;
  developer: string;
  description: string;
  releaseYear: number;
  coverImageUrl?: string;
  genre?: string;
  platform?: string;
}

export const gameService = {
  // Get all games
  getGames: async () => {
    const response = await api.get<Game[]>('/game');
    return response.data;
  },

  // Get a single game by ID
  getGame: async (id: string) => {
    const response = await api.get<Game>(`/game/${id}`);
    return response.data;
  },

  // Create a new game
  createGame: async (gameData: CreateGameInput) => {
    const response = await api.post<Game>('/game', gameData);
    return response.data;
  },

  // Update a game
  updateGame: async (id: string, gameData: Partial<CreateGameInput>) => {
    const response = await api.put<Game>(`/game/${id}`, gameData);
    return response.data;
  },

  // Delete a game
  deleteGame: async (id: string) => {
    const response = await api.delete(`/game/${id}`);
    return response.data;
  },
}; 