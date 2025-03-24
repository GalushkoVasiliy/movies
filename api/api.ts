import { MovieCategory } from '@/interfaces/interfaces';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Constants from 'expo-constants';
const { API_URL, API_KEY } = Constants.expoConfig?.extra || {};

export const filmsApi = createApi({
  reducerPath: 'filmsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${API_KEY}`);
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMoviesByCategory: builder.query({
      query: (category: MovieCategory) => `movie/${category}`,
    }),
    fetchMoviesByCategory: builder.mutation({
      query: ({ category, page }: { category: MovieCategory; page: number }) => 
        `movie/${category}?page=${page}`,
    }),
    fetchMovieById: builder.mutation({
      query: (id) => ({
        url: `movie/${id}`,
        method: 'GET',
      }),
    }),
    getSingleFilmCredits: builder.mutation({
      query: (id) => `movie/${id}/credits`,
    }),
    searchMovies: builder.mutation({
      query: (query) => `search/movie?query=${query}`,
    }),
    getGenres: builder.mutation({
      query: () => 'genre/movie/list',
    }),
    getPersonById: builder.mutation({
      query: (id) => `person/${id}`,
    }),
    getMoviesByPerson: builder.mutation({
      query: (id) => `person/${id}/movie_credits`,
    }),
  }),
});

export const {
  useGetMoviesByPersonMutation,
  useGetPersonByIdMutation,
  useGetGenresMutation,
  useSearchMoviesMutation,
  useGetSingleFilmCreditsMutation,
  useGetMoviesByCategoryQuery,
  useFetchMoviesByCategoryMutation,
  useFetchMovieByIdMutation
} = filmsApi;
