import { Movie } from '@/interfaces/interfaces';
import { createSlice } from '@reduxjs/toolkit';

interface initialStateProps {
  movies: Movie[];
}

const initialState: initialStateProps = {
  movies: [],
};

const LocalSavedFilms = createSlice({
  name: 'localSavedFilms',
  initialState,
  reducers: {
    addMovieToSaved: (state, action) => {
      state.movies = [...state.movies, action.payload];
    },
    deleteMovieFromSaved: (state, action) => {
      const movieIdToRemove = action.payload;
      state.movies = state.movies.filter(movie => movie.id !== movieIdToRemove);
    },
  },
});

export const {
  addMovieToSaved,
  deleteMovieFromSaved,
} = LocalSavedFilms.actions;

export default LocalSavedFilms.reducer;