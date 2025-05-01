// components/DeleteConfirmDialog.tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface Props {
  bookId: string;
  onCancel: () => void;
}

export default function DeleteConfirmDialog({ bookId, onCancel }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => axios.delete(`/api/books/${bookId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });

  return (
    <div className="modal">
      <p>Are you sure you want to delete this?</p>
      <button onClick={() => mutation.mutate()}>Delete</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}
