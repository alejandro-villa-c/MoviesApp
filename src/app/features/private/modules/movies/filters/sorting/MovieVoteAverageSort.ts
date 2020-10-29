import { Movie } from '../../models/Movie';
import IMovieSort from "./IMovieSort";

export default class MovieVoteAverageSort implements IMovieSort {
    public sortDescending(movies: Array<Movie>): Movie[] {
        return movies.sort((a, b) => b.vote_average - a.vote_average);
    }

    public sortAscending(movies: Array<Movie>): Movie[] {
        return movies.sort((a, b) => a.vote_average - b.vote_average);
    }
}