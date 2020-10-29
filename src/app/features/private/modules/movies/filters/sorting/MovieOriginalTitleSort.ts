import { Movie } from '../../models/Movie';
import IMovieSort from "./IMovieSort";

export default class MovieOriginalTitleSort implements IMovieSort {
    public sortDescending(movies: Array<Movie>): Movie[] {
        return movies.sort((a, b) => {
            const nameA = a.original_title.toUpperCase();
            const nameB = b.original_title.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    }

    public sortAscending(movies: Array<Movie>): Movie[] {
        return movies.sort((a, b) => {
            const nameA = a.original_title.toUpperCase();
            const nameB = b.original_title.toUpperCase();
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }
            return 0;
        });
    }
}