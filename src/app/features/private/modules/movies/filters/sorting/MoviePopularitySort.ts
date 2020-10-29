import { Movie } from '../../models/Movie';
import IMovieSort from './IMovieSort';

export default class MoviePopularitySort implements IMovieSort {
    public sortDescending(movies: Array<Movie>): Movie[] {
        return movies.sort((a, b) => b.popularity - a.popularity);
    }

    public sortAscending(movies: Array<Movie>): Movie[] {
        return movies.sort((a, b) => a.popularity - b.popularity);
    }
}