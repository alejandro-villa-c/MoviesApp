import { createAction, props } from '@ngrx/store';
import { Genre } from 'src/app/features/private/modules/movies/models/Genre';
import { Movie } from 'src/app/features/private/modules/movies/models/Movie';
import { MovieFilter } from 'src/app/features/private/modules/movies/models/MovieFilter';

export const setMoviesFilter = createAction('SetMoviesPage', props<{moviesFilter: MovieFilter}>());
export const setFavoriteMoviesFilter = createAction('SetFavoriteMoviesPage', props<{favoriteMoviesFilter: MovieFilter}>());
export const setMoviesAction = createAction('SetMoviesAction', props<{movies: Array<Movie>}>());
export const setTotalMovies = createAction('SetTotalMovies', props<{totalMovies: number}>());
export const setFavoriteMoviesAction = createAction('SetFavoriteMoviesAction', props<{favoriteMovies: Array<Movie>}>());
export const setFavoriteMovie = createAction('SetFavoriteMovie', props<{favoriteMovie: Movie}>());
export const setGenresAction = createAction('SetGenresAction', props<{genres: Array<Genre>}>());
