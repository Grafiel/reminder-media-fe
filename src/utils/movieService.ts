import { api } from './api';

export interface Movie {
  id: string;
  title: string;
  director: string;
  description: string;
  releaseYear: number;
  posterUrl?: string;
  genre?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMovieInput {
  title: string;
  director: string;
  description: string;
  releaseYear: number;
  posterUrl?: string;
  genre?: string;
}

export const movieService = {
  // Get all movies
  getMovies: async () => {
    const response = await api.get<Movie[]>('/movie');
    return response.data;
  },

  // Get a single movie by ID
  getMovie: async (id: string) => {
    const response = await api.get<Movie>(`/movie/${id}`);
    return response.data;
  },

  // Create a new movie
  createMovie: async (movieData: CreateMovieInput) => {
    const response = await api.post<Movie>('/movie', movieData);
    return response.data;
  },

  // Update a movie
  updateMovie: async (id: string, movieData: Partial<CreateMovieInput>) => {
    const response = await api.put<Movie>(`/movie/${id}`, movieData);
    return response.data;
  },

  // Delete a movie
  deleteMovie: async (id: string) => {
    const response = await api.delete(`/movie/${id}`);
    return response.data;
  },
}; 