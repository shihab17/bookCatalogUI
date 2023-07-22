import { IBook } from "../../../types/globalTypes";
import { api } from "../../api/apiSlice";
interface GetBooksParams {
    page?: number;
    searchTerm?: string;
    limit?: number;
    genre?: string;
    publicationYear?: string;
  }
  type PostBookResponse = {
    data: IBook; //
  };
const bookApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query({
          query: ({
            page = 1,
            searchTerm = "",
            limit = 10,
            genre = "",
            publicationYear = "",
          }: GetBooksParams) => {
            let query = `/book?page=${page}&searchTerm=${searchTerm}&limit=${limit}`;
            if (genre !== "") {
              query += `&genre=${genre}`;
            }
            if (publicationYear !== "") {
              query += `&publicationYear=${publicationYear}`;
            }
            return query;
          },
          providesTags: ['books']
        }),
        singleBook: builder.query({
          query: (id: string) => `/book/${id}`,
        }),
        postBook: builder.mutation<PostBookResponse, { data: IBook }>({
          query: ({ data }: { data: IBook }) => ({
            url: `/book`,
            method: "POST",
            body: data,
          }),
          invalidatesTags: ['books']
        }),
        updateBook: builder.mutation<PostBookResponse, { data: IBook }>({
          query: ({ id, data }: { id: string; data: IBook }) => ({
            url: `/book/${id}`,
            method: "PUT",
            body: data,
          }),
        }),
      }),
})

export const {useGetBooksQuery, useSingleBookQuery, usePostBookMutation } = bookApi;