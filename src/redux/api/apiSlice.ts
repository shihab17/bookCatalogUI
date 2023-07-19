import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
interface GetBooksParams {
  page?: number;
  searchTerm?: string;
  limit?: number;
  genre?: string;
  publicationYear?: string;
}
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
  }),
});

export const { useGetBooksQuery, useSingleBookQuery } = api;
