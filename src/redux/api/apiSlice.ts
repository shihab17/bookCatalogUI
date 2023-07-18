import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
interface GetBooksParams {
  page?: number;
  searchTerm?: string;
  limit?: number;
}
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1' }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ page = 1, searchTerm = '', limit = 10 }: GetBooksParams ) => `/book?page=${page}&searchTerm=${searchTerm}&limit=${limit}`,
    }),
    singleBook: builder.query({
      query: (id: string) => `/book/${id}`,
    }),
  }),
});

export const { useGetBooksQuery, useSingleBookQuery } = api;
