import {combineReducers} from 'redux';
import LocalSavedFilms from './localSavedFilms';
import Genres from './genres';
import { filmsApi } from '@/api/api';

const rootReducer = combineReducers({
  genres: Genres,
  movies: LocalSavedFilms,
  [filmsApi.reducerPath]: filmsApi.reducer,
});

export default rootReducer;
