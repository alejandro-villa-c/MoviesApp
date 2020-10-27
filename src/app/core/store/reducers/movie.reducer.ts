import { Action, createReducer, on } from '@ngrx/store';
import { Movie } from 'src/app/shared/models/movies/Movie';
import { MovieFilter } from 'src/app/shared/models/movies/MovieFilter';
import { MovieSortOptions } from 'src/app/shared/models/movies/MovieSortOptions';
import { setFavoriteMovie, setFavoriteMoviesAction, setFavoriteMoviesFilter, setGenresAction, setMoviesAction, setMoviesFilter, setTotalMovies } from '../actions/movie.actions';
import { MovieState } from '../models/MovieState';

export const defaultMovieFilter: MovieFilter = new MovieFilter(1, MovieSortOptions.PopularityDesc, 10, []);

export const initialState: MovieState = {
    moviesFilter: defaultMovieFilter,
    favoriteMoviesFilter: defaultMovieFilter,
    movies: [],
    favoriteMovies: JSON.parse(sessionStorage.getItem('favorite-movies') || '[]'),
    totalMovies: null,
    genres: []
};

// tslint:disable-next-line: variable-name
const _movieReducer = createReducer(
    initialState,
    on(setMoviesFilter, (state: MovieState, { moviesFilter }) => {
        return { ...state, moviesFilter };
    }),
    on(setFavoriteMoviesFilter, (state: MovieState, { favoriteMoviesFilter }) => {
        return { ...state, favoriteMoviesFilter };
    }),
    on(setMoviesAction, (state: MovieState, { movies }) => {
        const moviesClone: Movie[] = [...movies].map((movie: Movie) => {
            const movieClone: Movie = { ...movie };
            movieClone.isFavorite = state.favoriteMovies.map(x => x.id).includes(movieClone.id);
            return movieClone;
        });
        return { ...state, movies: moviesClone };
    }),
    on(setTotalMovies, (state: MovieState, { totalMovies }) => {
        return { ...state, totalMovies };
    }),
    on(setFavoriteMoviesAction, (state: MovieState, { favoriteMovies }) => {
        sessionStorage.setItem('favorite-movies', JSON.stringify(favoriteMovies));
        return { ...state, favoriteMovies };
    }),
    on(setFavoriteMovie, (state: MovieState, { favoriteMovie }) => {
        const favoriteMovieClone = { ...favoriteMovie };
        const moviesClone: Movie[] = [ ...state.movies ];
        favoriteMovieClone.isFavorite = favoriteMovie.isFavorite;
        const indexInMovies: number = moviesClone.map(x => x.id).indexOf(favoriteMovieClone.id);
        if (indexInMovies > -1) {
            moviesClone.splice(indexInMovies, 1);
            moviesClone.splice(indexInMovies, 0, favoriteMovieClone);
        }
        const favoriteMoviesClone: Movie[] = [ ...state.favoriteMovies ];
        if (favoriteMovieClone.isFavorite) {
            favoriteMoviesClone.push(favoriteMovieClone);
        } else {
            const indexInFavoriteMovies: number = favoriteMoviesClone.map(x => x.id).indexOf(favoriteMovieClone.id);
            if (indexInFavoriteMovies > -1) {
                favoriteMoviesClone.splice(indexInFavoriteMovies, 1);
            }
        }
        sessionStorage.setItem('favorite-movies', JSON.stringify(favoriteMoviesClone));
        return { ...state, movies: moviesClone, favoriteMovies: favoriteMoviesClone };
    }),
    on(setGenresAction, (state: MovieState, { genres }) => {
        return { ...state, genres };
    })
);

export function movieReducer(state: MovieState, action: Action): MovieState {
    return _movieReducer(state, action);
}
