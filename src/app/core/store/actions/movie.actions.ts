import { createAction, props } from '@ngrx/store';
import { Genre } from 'src/app/shared/models/movies/Genre';
import { Movie } from 'src/app/shared/models/movies/Movie';
import { MovieFilter } from 'src/app/shared/models/movies/MovieFilter';

export const setMoviesFilter = createAction('SetMoviesPage', props<{moviesFilter: MovieFilter}>());
export const setFavoriteMoviesFilter = createAction('SetFavoriteMoviesPage', props<{favoriteMoviesFilter: MovieFilter}>());
export const setMoviesAction = createAction('SetMoviesAction', props<{movies: Array<Movie>}>());
export const setTotalMovies = createAction('SetTotalMovies', props<{totalMovies: number}>());
export const setFavoriteMoviesAction = createAction('SetFavoriteMoviesAction', props<{favoriteMovies: Array<Movie>}>());
export const setFavoriteMovie = createAction('SetFavoriteMovie', props<{favoriteMovie: Movie}>());
export const setGenresAction = createAction('SetGenresAction', props<{genres: Array<Genre>}>());
