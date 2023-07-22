/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useNavigate, useParams } from "react-router-dom";
import {
  useSingleBookQuery,
  useUpdateBookMutation,
} from "../../../redux/features/book/bookApi";
import { useAppSelector } from "../../../redux/hooks";
import { IBook } from "../../../types/globalTypes";
import { useToasts } from "react-toast-notifications";

const BookDetails = () => {
  const { addToast } = useToasts();
  const [updateBook] = useUpdateBookMutation();
  const navigate = useNavigate();
  const param = useParams();
  const { data, isLoading } = useSingleBookQuery(param.id!);
  console.log(data?.data);
  const { userId } = useAppSelector((state) => state.user);
  const isBookCreatedByUser = data?.data?.createdBy === userId;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    console.log("🚀 ~ file: BookDetails.tsx:27 ~ handleSubmit ~ formData:", formData)

    const formObject: IBook = {
      title: "",
      author: "",
      genre: "",
      publicationDate: "",
    }; // Use Partial<IBook> to initialize as an empty object
    console.log("🚀 ~ file: BookDetails.tsx:34 ~ handleSubmit ~ formObject:", formObject)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    formData.forEach((defaultValue, key) => {
      formObject[key as keyof IBook] = defaultValue as any;
    });
    console.log("Form data:", formObject);
    try {
      const response = await updateBook({id: param.id!, data: formObject});
      console.log("update response:", response);
      if ("error" in response) {
        addToast("Failed to updated book!", { appearance: "error" });
        console.log(response.error);
      } else {
        console.log("Book submitted successfully!");
        addToast("Successfully book updated!", { appearance: "success" });
        navigate('/home');
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <div className="container mx-auto px-4 mt-4">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Book Details</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="title" className="block font-bold mb-2">
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={data?.data?.title}
                disabled={!isBookCreatedByUser}
                className="w-full border border-gray-400 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="author" className="block font-bold mb-2">
                Author:
              </label>
              <input
                type="text"
                id="author"
                name="author"
                defaultValue={data?.data?.author}
                disabled={!isBookCreatedByUser}
                className="w-full border border-gray-400 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="genre" className="block font-bold mb-2">
                Genre:
              </label>
              <input
                type="text"
                id="genre"
                name="genre"
                defaultValue={data?.data?.genre}
                disabled={!isBookCreatedByUser}
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
                defaultValue={data?.data?.publicationDate}
                disabled={!isBookCreatedByUser}
                className="w-full border border-gray-400 p-2 rounded"
              />
            </div>
            {isBookCreatedByUser && (
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                Update Book
              </button>
            )}
          </form>

          {/* Rest of the code for reviews display is the same as before */}
        </>
      )}
    </div>
  );
};

export default BookDetails;
