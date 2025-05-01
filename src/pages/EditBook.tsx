import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const books = JSON.parse(localStorage.getItem("books") || "[]");
    const book = books.find((b: any) => b.id === parseInt(id!));
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setDescription(book.description);
      setYear(book.year.toString());
    }
  }, [id]);

  const handleUpdate = () => {
    const books = JSON.parse(localStorage.getItem("books") || "[]");
    const updatedBooks = books.map((b: any) =>
      b.id === parseInt(id!) ? { ...b, title, author, description, year: parseInt(year) } : b
    );
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    navigate("/books");
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-xl mb-4">Edit Book</h2>
      <div className="space-y-4">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" className="w-full p-2 border rounded" />
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full p-2 border rounded" />
        <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="Publication Year" type="number" className="w-full p-2 border rounded" />
        <div className="flex space-x-4">
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
          <button onClick={() => navigate("/books")} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditBook;