import { Movie } from '../../models/Movie';
import MovieOriginalTitleSort from './MovieOriginalTitleSort';
import MoviePopularitySort from './MoviePopularitySort';
import MovieReleaseDateSort from './MovieReleaseDateSort';
import { MovieSortOptions } from './MovieSortOptions';
import MovieVoteAverageSort from './MovieVoteAverageSort';

export default class MovieSorter {
    constructor(
        public movies: Movie[]
    ) {}

    public sort(sortBy: MovieSortOptions): Movie[] {
        switch (sortBy) {
            case MovieSortOptions.PopularityDesc:
                return new MoviePopularitySort().sortDescending(this.movies);
            case MovieSortOptions.PopularityAsc:
                return new MoviePopularitySort().sortAscending(this.movies);
            case MovieSortOptions.VoteAverageDesc:
                return new MovieVoteAverageSort().sortDescending(this.movies);
            case MovieSortOptions.VoteAverageAsc:
                return new MovieVoteAverageSort().sortAscending(this.movies);
            case MovieSortOptions.OriginalTitleDesc:
                return new MovieOriginalTitleSort().sortDescending(this.movies);
            case MovieSortOptions.OriginalTitleAsc:
                return new MovieOriginalTitleSort().sortAscending(this.movies);
            case MovieSortOptions.ReleaseDateDesc:
                return new MovieReleaseDateSort().sortDescending(this.movies);
            case MovieSortOptions.ReleaseDateAsc:
                return new MovieReleaseDateSort().sortAscending(this.movies);
            default:
                return this.movies;
        }
    }
}