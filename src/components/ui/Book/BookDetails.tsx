/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useNavigate, useParams } from "react-router-dom";
import {
  useSingleBookQuery,
  useUpdateBookMutation,
} from "../../../redux/features/book/bookApi";
import { useAppSelector } from "../../../redux/hooks";
import { IBook, IReview } from "../../../types/globalTypes";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BookDetails = () => {
  const [updateBook] = useUpdateBookMutation();
  const navigate = useNavigate();
  const param = useParams();
  const { data, isLoading } = useSingleBookQuery(param.id!);
  console.log(data?.data);
  const { userId } = useAppSelector((state) => state.user);
  const isBookCreatedByUser = data?.data?.createdBy === userId;
  let reviewList: IReview[] = [];
  reviewList = data?.data?.reviews || [];
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
    formData.forEach((defaultValue, key) => {
      formObject[key as keyof IBook] = defaultValue as any;
    });
    console.log("Form data:", formObject);
    try {
      const response = await updateBook({ id: param.id!, data: formObject });
      console.log("update response:", response);
      if ("error" in response) {
        // addToast("Failed to updated book!", { appearance: "error" });
        toast.success('Toast notification message', {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(response.error);
      } else {
        console.log("Book submitted successfully!");
        // addToast("Successfully book updated!", { appearance: "success" });
        toast.success('Successfully book updated!', {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/home");
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const review: IReview = {
      text: formData.get("review") as string,
    };
    console.log("Review:", review);
    const formObject = {
      ...data.data,
      reviews: [...data.data.reviews, review],
    };
    console.log("object:", formObject);
    try {
      const response = await updateBook({ id: param.id!, data: formObject });
      console.log("Review response:", response);
      if ("error" in response) {
        // addToast("Failed to updated review!", { appearance: "error" });
        console.log(response.error);
      } else {
        console.log("Book submitted successfully!");
        // addToast("Successfully book updated your review!", {
        //   appearance: "success",
        // });
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <>
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
                <label
                  htmlFor="publicationDate"
                  className="block font-bold mb-2"
                >
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
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Update Book
                </button>
              )}
            </form>

            {/* Rest of the code for reviews display is the same as before */}
          </>
        )}
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>
        <div>
          {reviewList.map((review, index: number) => (
            <div key={index} className="flex gap-3 items-center mb-5">
              <div className="default-avatar w-10 h-10 rounded-full flex items-center justify-center bg-gray-400 text-white">
                User
              </div>
              <p>{review.text}</p>
            </div>
          ))}
        </div>
        {userId && (
          <form onSubmit={handleReviewSubmit} className="mt-4">
            <input
              type="text"
              id="review"
              name="review"
              className="w-full border border-gray-400 p-2 rounded"
              placeholder="Write a review..."
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Submit Review
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default BookDetails;
