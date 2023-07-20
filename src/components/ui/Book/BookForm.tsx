/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FaArrowLeft } from "react-icons/fa";
import { IBook } from "../../../types/globalTypes";
import { useState } from "react";
import { usePostBookMutation } from "../../../redux/api/apiSlice";
import { useToasts } from "react-toast-notifications";
interface BookFormProps {
  onCancel: () => void;
}
const BookForm: React.FC<BookFormProps> = ({ onCancel }) => {
  const { addToast } = useToasts();
  const [postBook, { isLoading, isError, isSuccess }] = usePostBookMutation();
  console.log(isLoading, isError, isSuccess);
  const [formData, setFormData] = useState<IBook>({
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const formObject: IBook = {
      title: "",
      author: "",
      genre: "",
      publicationDate: "",
    }; // Use Partial<IBook> to initialize as an empty object
    // eslint-disable-next-line react-hooks/rules-of-hooks
    formData.forEach((value, key) => {
      formObject[key as keyof IBook] = value as any;
    });
    console.log("Form data:", formObject);
    try {
      const options = {
        data: formObject,
      };
      const response = await postBook(options);
      console.log("Post response:", response);
      if ("error" in response) {
        addToast("Failed to submit book!", { appearance: "error" });
        console.log(response.error);
      } else {
        console.log("Book submitted successfully!");
        addToast("Successfully book added!", { appearance: "success" });
      }
    } catch (error) {
      console.log("err", error);
    }
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
          <label htmlFor="title" className="block font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full border border-gray-400 p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="author" className="block font-bold mb-2">
            Author:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            className="w-full border border-gray-400 p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="genre" className="block font-bold mb-2">
            Genre:
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            className="w-full border border-gray-400 p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="publicationDate" className="block font-bold mb-2">
            Publication Date:
          </label>
          <input
            type="date"
            id="publicationDate"
            name="publicationDate"
            className="w-full border border-gray-400 p-2 rounded"
          />
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
