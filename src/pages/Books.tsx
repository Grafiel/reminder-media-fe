import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import axios from "../utils/AxiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  year: number;
}

const Books = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch books from backend
  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axios.get("/books");
      return res.data;
    },
  });

  // Delete book mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`/books/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  const deleteBook = (id: number) => {
    deleteMutation.mutate(id);
  };

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
              onDelete={deleteBook}
              onEdit={() => navigate(`/edit-book/${book.id}`)}
            />
          ))}
        </div>
      )}

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
