// components/CreateBookForm.tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import axios from '../utils/AxiosInstance';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface BookFormData {
  id?: string;
  title: string;
  author: string;
  description: string;
  year: string;
}

interface Props {
  onSuccess?: () => void;
  onCancel?: () => void;
  isEdit?: boolean;
  defaultData?: BookFormData;
}

const CreateBookForm: React.FC<Props> = ({ 
  onSuccess, 
  onCancel, 
  isEdit = false, 
  defaultData 
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<BookFormData>();
  
  // Set default values if in edit mode
  useEffect(() => {
    if (isEdit && defaultData) {
      setValue("title", defaultData.title);
      setValue("author", defaultData.author);
      setValue("description", defaultData.description);
      setValue("year", defaultData.year);
    }
  }, [isEdit, defaultData, setValue]);
  
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (bookData: BookFormData) => {
      if (isEdit && defaultData) {
        // If editing, use PUT request
        return axios.put(`/books/${defaultData.id}`, bookData);
      } else {
        // If creating new, use POST request
        return axios.post('/books/add', bookData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      reset();
      if (onSuccess) onSuccess();
      if (onCancel) onCancel();
    }
  });

  const onSubmit: SubmitHandler<BookFormData> = (data) => {
    if (isEdit && !confirm("Are you sure you want to update this book?")) {
      return;
    }
    mutation.mutate(data);
  };

  return (
    <div className="relative">
      {mutation.isPending && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="flex items-center bg-white/90 px-6 py-3 rounded-lg shadow-lg">
            <span className="text-2xl mr-4 text-gray-800">{isEdit ? "Updating..." : "Creating..."}</span>
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
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            className={
              "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " +
              (errors.title && "border-red-500")
            }
            placeholder="Book Title"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <p className="text-red-600 text-xs italic" id="titleError">
              Title is required.
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Author</label>
          <input
            type="text"
            id="author"
            className={
              "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " +
              (errors.author && "border-red-500")
            }
            placeholder="Book Author"
            {...register("author", { required: true })}
          />
          {errors.author && (
            <p className="text-red-600 text-xs italic" id="authorError">
              Author is required.
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            className={
              "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " +
              (errors.description && "border-red-500")
            }
            rows={4}
            placeholder="Book Description"
            {...register("description", { required: true })}
          ></textarea>

          {errors.description && (
            <p className="text-red-600 text-xs italic" id="descriptionError">
              Description is required.
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Publication Year
          </label>
          <input
            type="text"
            id="year"
            className={
              "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " +
              (errors.year && "border-red-500")
            }
            placeholder="Publication Year"
            {...register("year", { required: true, pattern: /^\d{4}$/ })}
          />
          {errors.year && (
            <p className="text-red-600 text-xs italic" id="yearError">
              Publication year is required (4 digits).
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`${isEdit ? 'bg-blue-500 hover:bg-blue-700' : 'bg-green-500 hover:bg-green-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            {isEdit ? 'Save Book' : 'Create Book'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateBookForm;