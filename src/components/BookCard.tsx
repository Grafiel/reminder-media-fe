import { Link } from 'react-router-dom';
import { Book } from '../utils/bookService';

interface BookCardProps {
  book: Book;
  onDelete: (id: string) => void;
}

export default function BookCard({ book, onDelete }: BookCardProps) {
  const discountedPrice = book.price * (1 - book.discountPercentage / 100);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {book.category}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{book.description}</p>
        <div className="flex justify-between items-center">
          <div>
            {book.discountPercentage > 0 ? (
              <div>
                <span className="text-lg font-bold text-green-600">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${book.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold">${book.price.toFixed(2)}</span>
            )}
          </div>
          <div className="space-x-2">
            <Link
              to={`/books/${book.id}/edit`}
              className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Edit
            </Link>
            <button
              onClick={() => onDelete(book.id)}
              className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}