import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useCallback } from 'react';
import { MovieDetails } from '@/interfaces/interfaces';
import { RootState } from '@/store';
import { addMovieToSaved, deleteMovieFromSaved } from '@/store/reducers/localSavedFilms';

export const useToggleFavorite = (movie: MovieDetails | null) => {
  const dispatch = useDispatch();

  const savedMovies = useSelector((state: RootState) => state.movies.movies);

  const isFavorite = useMemo(() => {
    if (!movie) return false;
    return savedMovies.some((savedMovie) => savedMovie.id === movie.id);
  }, [movie, savedMovies]);

  const toggleFavorite = useCallback(() => {
    if (!movie) return;

    if (isFavorite) {
      dispatch(deleteMovieFromSaved(movie.id));
    } else {
      dispatch(addMovieToSaved(movie));
    }
  }, [dispatch, isFavorite, movie]);

  return { isFavorite, toggleFavorite };
};
