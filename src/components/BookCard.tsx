import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface Props {
  book: {
    id: number;
    title: string;
    author: string;
    description: string;
    year: number;
  };
  onDelete: (id: number) => void;
  onEdit: () => void;
}

const BookCard = ({ book, onDelete, onEdit }: Props) => {
  return (
    <div className="bg-white shadow rounded p-4">
      <div className="flex justify-end space-x-2 mb-2">
        <PencilIcon onClick={onEdit} className="h-5 w-5 cursor-pointer text-blue-500" />
        <TrashIcon onClick={() => onDelete(book.id)} className="h-5 w-5 cursor-pointer text-red-500" />
      </div>
      <p><strong>Title:</strong> {book.title}</p>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Publication Year:</strong> {book.year}</p>
    </div>
  );
};

export default BookCard;