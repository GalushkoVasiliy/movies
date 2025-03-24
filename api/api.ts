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
    getPopularMovies: builder.query({
      query: () => 'movie/popular',
    }),
    getTopRatedMovies: builder.query({
      query: () => 'movie/top_rated',
    }),
    fetchPopularMovies: builder.mutation({
      query: (page) => ({
        url: `movie/popular?page=${page}`,
        method: 'GET',
      }),
    }),
    fetchTopRatedMovies: builder.mutation({
      query: (page) => ({
        url: `movie/top_rated?page=${page}`,
        method: 'GET',
      }),
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
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useFetchPopularMoviesMutation,
  useFetchTopRatedMoviesMutation,
  useFetchMovieByIdMutation
} = filmsApi;
