import { FaPlus } from "react-icons/fa";
import BookList from "./BookList";
import BookForm from "./BookForm";
import { useState } from "react";

const Book = () => {
    const [showForm, setShowForm] = useState(false);
  const handleAdd = () => {
    setShowForm(true);
  };
  const handleFormCancel = () => {
    setShowForm(false);
  };
  return (
    <div>
       <div className="mb-4 flex justify-end">
        {!showForm && (
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAdd}
          >
            <span className="flex items-center">
              <FaPlus className="mr-2" />
              ADD
            </span>
          </button>
        )}
      </div>
      {showForm ? (
        <BookForm onCancel={handleFormCancel} />
      ) : (
        <BookList />
      )}
    </div>
  );
};

export default Book;
