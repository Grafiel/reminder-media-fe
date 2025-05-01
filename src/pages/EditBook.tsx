import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CreateBookForm from '../components/CreateBookForm';
import { bookService } from '../utils/bookService';

export default function EditBook() {
  const { id } = useParams<{ id: string }>();

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Book</h1>
      <CreateBookForm
        isEdit
        bookId={id}
        defaultValues={{
          title: book.title,
          description: book.description,
          price: book.price,
          category: book.category,
          discountPercentage: book.discountPercentage,
        }}
      />
    </div>
  );
} 