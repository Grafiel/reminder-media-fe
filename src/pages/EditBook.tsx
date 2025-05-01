import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "../utils/AxiosInstance";
import CreateBookForm, { BookFormData } from "../components/CreateBookForm";

const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: book, isLoading, error } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const response = await axios.get(`/books/${id}`);
      return response.data;
    }
  });

  const handleSuccess = () => {
    navigate("/books", { replace: true });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center bg-white/90 px-6 py-3 rounded-lg shadow-lg">
          <span className="text-2xl mr-4 text-gray-800">Loading...</span>
          <svg
            className="animate-spin h-5 w-5 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
        <p>Error loading book data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold mb-6 mt-10">Edit Book</h2>
      {book && (
        <CreateBookForm 
          isEdit={true} 
          defaultData={book as BookFormData} 
          onSuccess={handleSuccess} 
          onCancel={() => navigate("/books")}
        />
      )}
    </div>
  );
};

export default EditBook;