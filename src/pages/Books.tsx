// pages/Books.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";
import axios from "../utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  year: number;
  image?: string;
}

const Books = () => {
  const navigate = useNavigate();
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: ["book"],
    queryFn: async () => {
      const res = await axios.get("/book");
      return res.data;
    },
  });

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Books</h1>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={() => navigate(`/edit-book/${book.id}`)}
              onDelete={() => setSelectedBookId(book.id)} // 🔥 trigger modal
            />
          ))}
        </div>
      )}

      {/* 🔥 Delete confirmation dialog */}
      {selectedBookId !== null && (
        <DeleteConfirmDialog
          bookId={selectedBookId.toString()}
          onCancel={() => setSelectedBookId(null)}
        />
      )}

      {/* Add new book button */}
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
