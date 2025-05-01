// components/CreateBookForm.tsx
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface BookFormData {
  title: string;
  author: string;
  description: string;
  year: string;
}

interface Props {
  onCancel: () => void;
}

export default function CreateBookForm({ onCancel }: Props) {
  const { register, handleSubmit, reset } = useForm<BookFormData>();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newBook: BookFormData) => axios.post('/api/books', newBook),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      reset();
    },
  });

  const onSubmit = (data: BookFormData) => mutation.mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Title" {...register('title')} />
      <input placeholder="Author" {...register('author')} />
      <input placeholder="Description" {...register('description')} />
      <input placeholder="Publication Year" {...register('year')} />
      <button type="submit">Create</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}
