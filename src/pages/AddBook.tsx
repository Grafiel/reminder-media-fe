import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const books = JSON.parse(localStorage.getItem("books") || "[]");
    const newBook = {
      id: Date.now(),
      title,
      author,
      description,
      year: parseInt(year),
    };
    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));
    navigate("/books");
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-xl mb-4">Add Book</h2>
      <div className="space-y-4">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" className="w-full p-2 border rounded" />
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full p-2 border rounded" />
        <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="Publication Year" type="number" className="w-full p-2 border rounded" />
        <div className="flex space-x-4">
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
          <button onClick={() => navigate("/books")} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
