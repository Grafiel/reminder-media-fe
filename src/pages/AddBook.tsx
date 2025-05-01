import CreateBookForm from '../components/CreateBookForm';

export default function AddBook() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Book</h1>
      <CreateBookForm />
    </div>
  );
}
