import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { songService } from '../utils/songService';
import Song from '../components/Song';

interface CreateSongModalProps {
  onClose: () => void;
}

interface FormData {
  title: string;
  artist: string;
  album: string;
  releaseYear: string;
  coverArtUrl: string;
  genre: string;
  duration: string;
}

function CreateSongModal({ onClose }: CreateSongModalProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    artist: '',
    album: '',
    releaseYear: '',
    coverArtUrl: '',
    genre: '',
    duration: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.artist.trim()) newErrors.artist = 'Artist is required';
    if (!formData.releaseYear) {
      newErrors.releaseYear = 'Release year is required';
    } else {
      const year = parseInt(formData.releaseYear);
      if (isNaN(year)) {
        newErrors.releaseYear = 'Release year must be a valid number';
      } else if (year < 1800 || year > new Date().getFullYear()) {
        newErrors.releaseYear = 'Please enter a valid year';
      }
    }
    if (formData.duration && !/^\d+$/.test(formData.duration)) {
      newErrors.duration = 'Duration must be a valid number in seconds';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createMutation = useMutation({
    mutationFn: (data: FormData) => {
      return songService.createSong({
        ...data,
        releaseYear: parseInt(data.releaseYear),
        duration: data.duration ? parseInt(data.duration) : undefined,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] });
      onClose();
    },
    onError: (error: any) => {
      console.error('Create song error:', error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Submitting form data:', formData);
      createMutation.mutate(formData);
    }
  };

  const handleReleaseYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setFormData({ ...formData, releaseYear: value });
    }
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setFormData({ ...formData, duration: value });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title:</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.title ? 'border-red-500' : ''}`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Artist:</label>
            <input
              type="text"
              value={formData.artist}
              onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.artist ? 'border-red-500' : ''}`}
            />
            {errors.artist && <p className="text-red-500 text-sm mt-1">{errors.artist}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Album:</label>
            <input
              type="text"
              value={formData.album}
              onChange={(e) => setFormData({ ...formData, album: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Release Year:</label>
            <input
              type="number"
              min="1800"
              max={new Date().getFullYear()}
              value={formData.releaseYear}
              onChange={handleReleaseYearChange}
              placeholder="e.g., 2024"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.releaseYear ? 'border-red-500' : ''}`}
            />
            {errors.releaseYear && <p className="text-red-500 text-sm mt-1">{errors.releaseYear}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cover Art URL:</label>
            <input
              type="text"
              value={formData.coverArtUrl}
              onChange={(e) => setFormData({ ...formData, coverArtUrl: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Genre:</label>
            <input
              type="text"
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (seconds):</label>
            <input
              type="number"
              min="0"
              value={formData.duration}
              onChange={handleDurationChange}
              placeholder="e.g., 180 for 3 minutes"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.duration ? 'border-red-500' : ''}`}
            />
            {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Songs() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { data: songs, isLoading, error } = useQuery({
    queryKey: ['songs'],
    queryFn: songService.getSongs,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-8">
        Error loading songs. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Songs</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {songs?.map((song) => (
          <Song
            key={song.id}
            id={song.id}
            title={song.title}
            artist={song.artist}
            album={song.album}
            releaseYear={song.releaseYear}
            coverArtUrl={song.coverArtUrl}
            genre={song.genre}
            duration={song.duration}
          />
        ))}
      </div>

      {isCreateModalOpen && (
        <CreateSongModal onClose={() => setIsCreateModalOpen(false)} />
      )}
    </div>
  );
} 