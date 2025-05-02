import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { songService } from '../utils/songService';

interface SongProps {
  id: string;
  title: string;
  artist: string;
  album?: string;
  releaseYear: number;
  coverArtUrl?: string;
  genre?: string;
  duration?: number;
}

export default function Song({ id, title, artist, album, releaseYear, coverArtUrl, genre, duration }: SongProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [imageError, setImageError] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: songService.deleteSong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] });
      setIsDeleteModalOpen(false);
    },
  });

  const formatDuration = (seconds: number) => {
    if (!seconds) return '';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <button onClick={() => setIsUpdateModalOpen(true)} className="text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
        <button onClick={() => setIsDeleteModalOpen(true)} className="text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div>
        {coverArtUrl && !imageError ? (
          <img 
            src={coverArtUrl} 
            alt={title} 
            className="w-full h-48 object-cover rounded-md mb-4"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div>
          <span className="font-semibold">Title:</span> {title}
        </div>
        <div>
          <span className="font-semibold">Artist:</span> {artist}
        </div>
        {album && (
          <div>
            <span className="font-semibold">Album:</span> {album}
          </div>
        )}
        <div>
          <span className="font-semibold">Release Year:</span> {releaseYear}
        </div>
        {genre && (
          <div>
            <span className="font-semibold">Genre:</span> {genre}
          </div>
        )}
        {duration && (
          <div>
            <span className="font-semibold">Duration:</span> {formatDuration(duration)}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this song?</h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteMutation.mutate(id)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <UpdateSongModal
          song={{ id, title, artist, album, releaseYear, coverArtUrl, genre, duration }}
          onClose={() => setIsUpdateModalOpen(false)}
        />
      )}
    </div>
  );
}

interface UpdateSongModalProps {
  song: SongProps;
  onClose: () => void;
}

function UpdateSongModal({ song, onClose }: UpdateSongModalProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: song.title,
    artist: song.artist,
    album: song.album || '',
    releaseYear: String(song.releaseYear || ''),
    coverArtUrl: song.coverArtUrl || '',
    genre: song.genre || '',
    duration: String(song.duration || ''),
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

  const updateMutation = useMutation({
    mutationFn: () => {
      return songService.updateSong(song.id, {
        ...formData,
        releaseYear: parseInt(formData.releaseYear),
        duration: formData.duration ? parseInt(formData.duration) : undefined,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] });
      onClose();
    },
    onError: (error: any) => {
      console.error('Update song error:', error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      updateMutation.mutate();
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 