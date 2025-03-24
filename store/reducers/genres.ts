import { Genre } from '@/interfaces/interfaces';
import { createSlice } from '@reduxjs/toolkit';

interface initialStateProps {
  genres: Genre[];
}

const initialState: initialStateProps = {
  genres: [],
};

const Genres = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    addGenresList: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const {
  addGenresList,
} = Genres.actions;

export default Genres.reducer;