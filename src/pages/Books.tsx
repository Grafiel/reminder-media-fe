import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard.tsx";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  year: number;
}

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load books from localStorage or initialize
    const saved = localStorage.getItem("books");
    if (saved) setBooks(JSON.parse(saved));
  }, []);

  const deleteBook = (id: number) => {
    const updated = books.filter((b) => b.id !== id);
    setBooks(updated);
    localStorage.setItem("books", JSON.stringify(updated));
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Books</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onDelete={deleteBook} onEdit={() => navigate(`/edit-book/${book.id}`)} />
        ))}
      </div>
      <button
        onClick={() => navigate("/add-book")}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-red-500 text-white text-2xl flex items-center justify-center shadow-lg hover:bg-red-600"
      >
        +
      </button>
    </div>
  );
};

export default Books;