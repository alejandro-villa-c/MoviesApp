import { Movie } from '../../models/Movie';

export default class MovieRatingFilter {
    constructor(
        public movies: Movie[]
    ) {}

    public ratingLessThan(voteAverage: number) {
        return this.movies.filter((movie: Movie) => movie.vote_average <= voteAverage);
    }
}