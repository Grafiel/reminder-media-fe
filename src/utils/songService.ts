import { api } from './api';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  releaseYear: number;
  coverArtUrl?: string;
  genre?: string;
  duration?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSongInput {
  title: string;
  artist: string;
  album?: string;
  releaseYear: number;
  coverArtUrl?: string;
  genre?: string;
  duration?: number;
}

export const songService = {
  // Get all songs
  getSongs: async () => {
    const response = await api.get<Song[]>('/song');
    return response.data;
  },

  // Get a single song by ID
  getSong: async (id: string) => {
    const response = await api.get<Song>(`/song/${id}`);
    return response.data;
  },

  // Create a new song
  createSong: async (songData: CreateSongInput) => {
    const response = await api.post<Song>('/song', songData);
    return response.data;
  },

  // Update a song
  updateSong: async (id: string, songData: Partial<CreateSongInput>) => {
    const response = await api.put<Song>(`/song/${id}`, songData);
    return response.data;
  },

  // Delete a song
  deleteSong: async (id: string) => {
    const response = await api.delete(`/song/${id}`);
    return response.data;
  },
}; 