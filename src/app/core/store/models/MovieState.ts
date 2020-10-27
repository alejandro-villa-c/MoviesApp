import { Genre } from 'src/app/shared/models/movies/Genre';
import { Movie } from 'src/app/shared/models/movies/Movie';
import { MovieFilter } from 'src/app/shared/models/movies/MovieFilter';

export class MovieState {
    constructor(
        public moviesFilter: MovieFilter,
        public favoriteMoviesFilter: MovieFilter,
        public movies: Array<Movie>,
        public favoriteMovies: Array<Movie>,
        public totalMovies: number,
        public genres: Array<Genre>
    ) {}
}
