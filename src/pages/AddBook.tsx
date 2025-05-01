// pages/AddBook.tsx (or wherever this component lives)
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CreateBookForm, { BookFormData } from "../components/CreateBookForm";
import axios from "../utils/AxiosInstance";
// Removed useEffect import -> import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify'; // Optional

const addBook = async (data: BookFormData) => {
  return await axios.post("/products/add", data);
};

const AddBook = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Removed 'isSuccess' and 'error' from destructuring as they are not actively used
  // Keep 'error' if you plan to uncomment the error display block below
  const { mutate, isPending } = useMutation({ // <--- Adjusted destructuring
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // toast.success("Book added successfully!");
      navigate("/product", { replace: true });
    },
    onError: (err: any) => { // Error is handled via the 'err' parameter here
       // console.error("Failed to add book:", err);
       // toast.error(`Failed to add book: ${err.response?.data?.message || err.message}`);
       console.error("Failed to add book:", err);
       alert(`Failed to add book: ${err.response?.data?.message || err.message}`);
    }
  });

  const handleCancel = () => {
    navigate("/product", { replace: true });
  };

  // useEffect related to isSuccess was removed as logic moved to onSuccess callback

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="relative">
        {isPending && ( // isPending is still used here
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
            <div className="flex items-center bg-white/95 px-6 py-3 rounded-lg shadow-lg border border-gray-200">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600"
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
              <span className="text-lg font-medium text-gray-800">Adding Book...</span>
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Book</h2>

        <CreateBookForm
          onSubmitForm={mutate} // mutate is still used here
          onCancel={handleCancel}
          isLoading={isPending} // isPending is still used here
          isEdit={false}
        />

        {/* If you uncomment this block, add 'error' back to the useMutation destructuring */}
        {/* {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            Error retrieving state from hook: {error.message || 'Failed to add book'}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default AddBook;