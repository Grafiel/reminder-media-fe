// components/CreateBookForm.tsx
import { useForm, SubmitHandler } from 'react-hook-form';

// Define the shape of the form data (can be moved to a types file)
export interface BookFormData {
  title: string;
  author: string;
  description: string;
  year: string; // Keep as string if the input is text, parse if needed on backend/mutation
}

interface Props {
  onSubmitForm: (data: BookFormData) => void; // Function to call when form submits successfully
  onCancel: () => void;                    // Function to call when cancel button is clicked
  isLoading?: boolean;                     // Optional flag to disable form during submission
  defaultValues?: Partial<BookFormData>;   // Optional default values (useful for editing)
  isEdit?: boolean;                        // Optional flag to change button text etc.
}

export default function CreateBookForm({
  onSubmitForm,
  onCancel,
  isLoading = false,
  defaultValues = {},
  isEdit = false,
}: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<BookFormData>({
    defaultValues: defaultValues, // Set default values for the form
  });

  // Use react-hook-form's handleSubmit to validate before calling onSubmitForm
  const handleFormSubmit: SubmitHandler<BookFormData> = (data) => {
    onSubmitForm(data);
    // Resetting the form is usually handled by the parent after successful mutation/navigation
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Title"
          disabled={isLoading}
          className={`mt-1 block w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50`}
          {...register('title', { required: 'Title is required' })}
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
        <input
          id="author"
          type="text"
          placeholder="Author"
          disabled={isLoading}
          className={`mt-1 block w-full px-3 py-2 border ${errors.author ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50`}
          {...register('author', { required: 'Author is required' })}
        />
        {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          placeholder="Description"
          rows={3}
          disabled={isLoading}
          className={`mt-1 block w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50`}
          {...register('description')} // Optional field
        />
         {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
      </div>

      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">Publication Year</label>
        <input
          id="year"
          type="number" // Use type="number" for year input
          placeholder="Publication Year"
          disabled={isLoading}
          className={`mt-1 block w-full px-3 py-2 border ${errors.year ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50`}
          {...register('year', {
              required: 'Publication year is required',
              valueAsNumber: true, // Treat value as number
              min: { value: 1000, message: 'Year must be realistic' },
              max: { value: new Date().getFullYear(), message: `Year cannot be in the future` }
            })}
        />
         {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          disabled={isLoading}
          onClick={onCancel}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : (isEdit ? 'Update Book' : 'Create Book')}
        </button>
      </div>
    </form>
  );
}