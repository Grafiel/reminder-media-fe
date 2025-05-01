import { useNavigate } from "react-router-dom";
import CreateBookForm from "../components/CreateBookForm";

const AddBook = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/books", { replace: true });
  };

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold mb-6 mt-10">Add Book</h2>
      <CreateBookForm onSuccess={handleSuccess} />
    </div>
  );
};

export default AddBook;