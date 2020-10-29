import { Genre } from 'src/app/features/private/modules/movies/models/Genre';
import { Movie } from 'src/app/features/private/modules/movies/models/Movie';
import { MovieFilter } from 'src/app/features/private/modules/movies/models/MovieFilter';

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
