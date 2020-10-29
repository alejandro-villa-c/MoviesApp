import { Movie } from '../../models/Movie';
import IMovieSort from './IMovieSort';

export default class MovieReleaseDateSort implements IMovieSort {
    public sortDescending(movies: Array<Movie>): Movie[] {
        return movies.sort((a, b) => Number(b.release_date.replace(/-/g, '')) - Number(a.release_date.replace(/-/g, '')));
    }

    public sortAscending(movies: Array<Movie>): Movie[] {
        return movies.sort((a, b) => Number(a.release_date.replace(/-/g, '')) - Number(b.release_date.replace(/-/g, '')));
    }
}