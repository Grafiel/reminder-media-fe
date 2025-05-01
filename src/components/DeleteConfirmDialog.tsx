// components/DeleteConfirmDialog.tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../utils/AxiosInstance';

interface Props {
  bookId: string;
  onCancel: () => void;
}

export default function DeleteConfirmDialog({ bookId, onCancel }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => axios.delete(`/book/${bookId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['book'] });
    },
  });

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <p className="mb-4 text-gray-800 font-semibold">Are you sure you want to delete this book?</p>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            onClick={() => mutation.mutate(undefined, { onSuccess: onCancel })}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Deleting..." : "Delete"}
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
