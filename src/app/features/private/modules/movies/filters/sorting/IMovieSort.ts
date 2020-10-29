import { Movie } from "../../models/Movie";

export default interface IMovieSort {
    sortDescending(movies: Array<Movie>): Movie[];
    sortAscending(movies: Array<Movie>): Movie[];
}