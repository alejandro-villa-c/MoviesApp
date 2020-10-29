import { Genre } from '../../models/Genre';
import { Movie } from '../../models/Movie';

export default class MovieGenreFilter {
    constructor(
        public movies: Movie[]
    ) {}

    public genresContain(genres: Genre[]): Movie[] {
        if (genres && genres.length > 0) {
            return this.movies.filter((movie: Movie) => genres.every(x => movie.genre_ids.includes(x.id)));
        } else {
            return this.movies;
        }
    }
}