// components/UpdateBookForm.tsx
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  year: string;
}

interface Props {
  book: Book;
  onCancel: () => void;
}

export default function UpdateBookForm({ book, onCancel }: Props) {
  const { register, handleSubmit } = useForm<Book>({ defaultValues: book });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedBook: Book) =>
      axios.put(`/api/books/${book.id}`, updatedBook),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });

  const onSubmit = (data: Book) => mutation.mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Title" {...register('title')} />
      <input placeholder="Author" {...register('author')} />
      <input placeholder="Description" {...register('description')} />
      <input placeholder="Publication Year" {...register('year')} />
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}
