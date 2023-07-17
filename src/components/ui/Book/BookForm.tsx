import { FaArrowLeft } from "react-icons/fa";

interface BookFormProps {
  onCancel: () => void;
}
const BookForm: React.FC<BookFormProps> = ({ onCancel }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onCancel}
        >
          <span className="flex items-center">
            <FaArrowLeft className="mr-2" />
            Back to List
          </span>
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Book Form</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block font-bold mb-2">Title:</label>
          <input type="text" id="title" name="title" className="w-full border border-gray-400 p-2 rounded" />
        </div>
        <div>
          <label htmlFor="author" className="block font-bold mb-2">Author:</label>
          <input type="text" id="author" name="author" className="w-full border border-gray-400 p-2 rounded" />
        </div>
        <div>
          <label htmlFor="genre" className="block font-bold mb-2">Genre:</label>
          <input type="text" id="genre" name="genre" className="w-full border border-gray-400 p-2 rounded" />
        </div>
        <div>
          <label htmlFor="publicationDate" className="block font-bold mb-2">Publication Date:</label>
          <input type="date" id="publicationDate" name="publicationDate" className="w-full border border-gray-400 p-2 rounded" />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
