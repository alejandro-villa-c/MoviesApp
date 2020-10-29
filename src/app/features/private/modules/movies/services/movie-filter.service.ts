import { Injectable } from '@angular/core';
import MovieGenreFilter from '../filters/genre/MovieGenreFilter';
import MoviePaginator from '../filters/paging/MoviePaginator';
import MovieRatingFilter from '../filters/rating/MovieRatingFilter';
import MovieSorter from '../filters/sorting/MovieSorter';
import { Movie } from '../models/Movie';
import { MovieFilter } from '../models/MovieFilter';

@Injectable()
export class MovieFilterService {
    public applyFilters(movies: Array<Movie>, movieFilter: MovieFilter): Movie[] {
        let moviesClone: Movie[] = [...movies];
        moviesClone = new MovieSorter(moviesClone).sort(movieFilter.sort_by);
        moviesClone = new MovieRatingFilter(moviesClone).ratingLessThan(movieFilter.vote_average);
        moviesClone = new MovieGenreFilter(moviesClone).genresContain(movieFilter.with_genres);
        moviesClone = new MoviePaginator(moviesClone).paginate(movieFilter.page);
        return moviesClone;
    }
}
