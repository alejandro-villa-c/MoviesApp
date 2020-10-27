import { Injectable } from '@angular/core';
import { perPage } from 'src/app/features/private/components/movies-grid/movies-grid.component';
import { Genre } from '../models/movies/Genre';
import { Movie } from '../models/movies/Movie';
import { MovieFilter } from '../models/movies/MovieFilter';
import { MovieSortOptions } from '../models/movies/MovieSortOptions';

@Injectable()
export class MovieFilterService {
    public applyFilters(movies: Array<Movie>, movieFilter: MovieFilter): Movie[] {
        let moviesClone: Movie[] = [...movies];
        moviesClone = this.applySorting(moviesClone, movieFilter.sort_by);
        moviesClone = this.applyRatingLessThan(moviesClone, movieFilter.vote_average);
        if (movieFilter.with_genres && movieFilter.with_genres.length > 0) {
            moviesClone = this.applyGenreFilter(moviesClone, movieFilter.with_genres);
        }
        moviesClone = this.applyPaging(moviesClone, movieFilter.page);
        return moviesClone;
    }

    private applySorting(movies: Array<Movie>, sortBy: string): Movie[] {
        const sortedMovies: Movie[] = [...movies];
        switch (sortBy) {
            case MovieSortOptions.PopularityDesc:
                return sortedMovies.sort((a, b) => b.popularity - a.popularity);
            case MovieSortOptions.PopularityAsc:
                return sortedMovies.sort((a, b) => a.popularity - b.popularity);
            case MovieSortOptions.VoteAverageDesc:
                return sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
            case MovieSortOptions.VoteAverageAsc:
                return sortedMovies.sort((a, b) => a.vote_average - b.vote_average);
            case MovieSortOptions.OriginalTitleDesc:
                return sortedMovies.sort((a, b) => {
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
            case MovieSortOptions.OriginalTitleAsc:
                return sortedMovies.sort((a, b) => {
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
            case MovieSortOptions.ReleaseDateDesc:
                return sortedMovies.sort((a, b) => Number(b.release_date.replace(/-/g, '')) - Number(a.release_date.replace(/-/g, '')));
            case MovieSortOptions.ReleaseDateAsc:
                return sortedMovies.sort((a, b) => Number(a.release_date.replace(/-/g, '')) - Number(b.release_date.replace(/-/g, '')));
            default:
                return sortedMovies;
        }
    }

    private applyRatingLessThan(movies: Movie[], voteAverage: number): Movie[] {
        return [...movies].filter((movie: Movie) => movie.vote_average <= voteAverage);
    }

    private applyGenreFilter(movies: Movie[], genres: Genre[]): Movie[] {
        return [...movies].filter((movie: Movie) => genres.every(x => movie.genre_ids.includes(x.id)));
    }

    private applyPaging(movies: Movie[], page: number): Movie[] {
        const fromRecord: number = ((perPage * page) - perPage);
        const toRecord: number = (perPage * page);
        return [...movies].slice(fromRecord, toRecord);
    }
}
