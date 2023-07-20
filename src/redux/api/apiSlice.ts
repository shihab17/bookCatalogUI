import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBook } from '../../types/globalTypes';
interface GetBooksParams {
  page?: number;
  searchTerm?: string;
  limit?: number;
  genre?: string;
  publicationYear?: string;
}
type PostBookResponse = {
  data: IBook; // Change 'IBook' to the actual type of the response data
};
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1' }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ page = 1, searchTerm = '', limit = 10, genre= '', publicationYear= '' }: GetBooksParams ) => {
        let query = `/book?page=${page}&searchTerm=${searchTerm}&limit=${limit}`;
        if (genre !== '') {
          query += `&genre=${genre}`;
        }
        if (publicationYear !== '') {
          query += `&publicationYear=${publicationYear}`;
        }
        return query;
      },
    }),
    singleBook: builder.query({
      query: (id: string) => `/book/${id}`,
    }),
    postBook: builder.mutation<PostBookResponse, { data: IBook }>({
      query: ({data}: { data: IBook }) => ({
        url: `/book`,
        method: 'POST',
        body: data
      }),
      transformResponse: (response: unknown): PostBookResponse => {
        console.log("Transformed response:", response);
        return response as PostBookResponse;
      },
    }),
  }),
});

export const { useGetBooksQuery, useSingleBookQuery, usePostBookMutation } = api;
