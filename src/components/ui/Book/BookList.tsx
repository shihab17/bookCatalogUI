import { useState } from "react";
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { IBook } from "../../../types/globalTypes";
const BookList = () => {
    const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const data: IBook[] = [
    {
      _id: "1",
      title: "Book 1",
      author: "Author 1",
      genre: "Fiction",
      publicationDate: "2022-01-01",
    },
    {
      _id: "2",
      title: "Book 2",
      author: "Author 2",
      genre: "Non-fiction",
      publicationDate: "2022-02-15",
    },
    {
      _id: "3",
      title: "Book 3",
      author: "Author 3",
      genre: "Sci-fi",
      publicationDate: "2022-03-20",
    },
    {
      _id: "4",
      title: "Book 4",
      author: "Author 4",
      genre: "Mystery",
      publicationDate: "2022-04-10",
    },
    {
      _id: "5",
      title: "Book 5",
      author: "Author 5",
      genre: "Romance",
      publicationDate: "2022-05-05",
    },
    {
      _id: "6",
      title: "Book 6",
      author: "Author 6",
      genre: "Thriller",
      publicationDate: "2022-06-18",
    },
    {
      _id: "7",
      title: "Book 7",
      author: "Author 7",
      genre: "Fantasy",
      publicationDate: "2022-07-25",
    },
    {
      _id: "8",
      title: "Book 8",
      author: "Author 8",
      genre: "Historical Fiction",
      publicationDate: "2022-08-12",
    },
    {
      _id: "9",
      title: "Book 9",
      author: "Author 9",
      genre: "Biography",
      publicationDate: "2022-09-09",
    },
    {
      _id: "10",
      title: "Book 10",
      author: "Author 10",
      genre: "Science",
      publicationDate: "2022-10-16",
    },
    {
      _id: "11",
      title: "Book 11",
      author: "Author 11",
      genre: "Horror",
      publicationDate: "2022-11-22",
    },
    {
      _id: "12",
      title: "Book 12",
      author: "Author 12",
      genre: "Drama",
      publicationDate: "2022-12-30",
    },
  ];
 const filteredData = data.filter((item) =>
 item.title.toLowerCase().includes(searchTerm.toLowerCase())
);

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

const totalPages = Math.ceil(filteredData.length / itemsPerPage);

const handleChangePage = (page: number) => {
 setCurrentPage(page);
};

  const handleUpdate = (id: string) => {
    console.log(`Edit item with ID ${id}`);
  };

  const handleView = (id: string) => {
    console.log(`View item with ID ${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete item with ID ${id}`);
  };
  return (
    <div>
         <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Author</th>
            <th className="px-4 py-2">Genre</th>
            <th className="px-4 py-2">Publication Date</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((book) => (
            <tr key={book._id}>
              <td className="border px-4 py-2">{book.title}</td>
              <td className="border px-4 py-2">{book.author}</td>
              <td className="border px-4 py-2">{book.genre}</td>
              <td className="border px-4 py-2">{book.publicationDate}</td>
              <td className="border px-4 py-2 text-right">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleUpdate(book._id)}>
                  <FaEdit />
                </button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleView(book._id)}>
                  <FaEye />
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(book._id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-4">
        {Array.from(Array(totalPages), (_, index) => index + 1).map((page) => (
          <button
            key={page}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 ${currentPage === page ? 'bg-blue-700' : ''}`}
            onClick={() => handleChangePage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookList;
