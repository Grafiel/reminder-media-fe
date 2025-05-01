import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { bookService } from '../utils/bookService';

export default function EditBook() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: book, isLoading, error } = useQuery({
    queryKey: ['book', id],
    queryFn: () => bookService.getBook(id!),
    enabled: !!id,
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
        Error loading book. Please try again later.
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center text-gray-600 mt-8">Book not found.</div>
    );
  }

  // Redirect to books page since we're handling editing in the Book component
  navigate('/books');
  return null;
} 