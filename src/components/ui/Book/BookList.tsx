/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { IBook } from "../../../types/globalTypes";
import { useGetBooksQuery } from "../../../redux/api/apiSlice";
const BookList = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = useGetBooksQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const filteredData = data?.data.filter((item: { title: string }) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const currentItems = filteredData
    ? filteredData.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  // const totalPages = Math.ceil(data?.data.length / itemsPerPage);
  const totalPages = data?.meta?.page;

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
          {currentItems &&
            currentItems.map((book: IBook) => (
              <tr key={book._id}>
                <td className="border px-4 py-2">{book.title}</td>
                <td className="border px-4 py-2">{book.author}</td>
                <td className="border px-4 py-2">{book.genre}</td>
                <td className="border px-4 py-2">{book.publicationDate}</td>
                <td className="border px-4 py-2 text-right">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleUpdate(book._id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleView(book._id)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(book._id)}
                  >
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
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 ${
              currentPage === page ? "bg-blue-700" : ""
            }`}
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
