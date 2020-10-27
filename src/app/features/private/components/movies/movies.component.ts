import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MoviesResponse } from 'src/app/shared/models/movies/MoviesResponse';
import { Movie } from 'src/app/shared/models/movies/Movie';
import { MovieService } from 'src/app/shared/services/movie.service';
import { MovieState } from 'src/app/core/store/models/MovieState';
import { setFavoriteMoviesFilter, setGenresAction, setMoviesAction, setMoviesFilter, setTotalMovies } from 'src/app/core/store/actions/movie.actions';
import { MovieFilter } from 'src/app/shared/models/movies/MovieFilter';
import { Genre } from 'src/app/shared/models/movies/Genre';
import { MovieFilterService } from 'src/app/shared/services/movie-filter.service';
import { GenericResponse } from 'src/app/core/models/GenericResponse';
import { GenresResponse } from 'src/app/shared/models/movies/GenresResponse';

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html'
})
export class MoviesComponent implements OnInit, AfterContentChecked {
    public movies: Array<Movie> = [];
    public totalMovies: number = null;
    public favoriteMovies: Array<Movie> = [];
    public totalFavoriteMovies: number = null;
    public genres: Array<Genre> = [];
    public loading = false;
    public movieState: MovieState;

    constructor(
        private movieService: MovieService,
        private movieFilterService: MovieFilterService,
        private store: Store<{ movieState: MovieState }>) {
        this.store.select(state => state.movieState).subscribe((movieState: MovieState) => {
            this.movieState = movieState;
        });
        this.store.select(state => state.movieState.movies).subscribe((movies: Movie[]) => {
            this.movies = movies;
        });
        this.store.select(state => state.movieState.favoriteMovies).subscribe((favoriteMovies: Movie[]) => {
            this.favoriteMovies = this.movieFilterService.applyFilters(favoriteMovies, this.movieState.favoriteMoviesFilter);
        });
    }

    public async ngOnInit(): Promise<void> {
        this.loading = true;
        this.setFavoriteMovies(this.movieState.favoriteMoviesFilter);
        this.loading = false;
    }

    public async ngAfterContentChecked(): Promise<void> {
        if (this.movieState.genres && this.movieState.genres.length > 0) {
            this.genres = this.movieState.genres;
        } else {
            const genresResponse: GenericResponse<GenresResponse> = await this.movieService.getGenres();
            if (genresResponse.success) {
                this.genres = genresResponse.data.genres;
                this.store.dispatch(setGenresAction({ genres: this.genres }));
            }
        }
    }

    public async setMovies(movieFilter: MovieFilter): Promise<void> {
        if ((!this.movieState.movies || this.movieState.movies.length === 0) ||
            JSON.stringify(movieFilter) !== JSON.stringify(this.movieState.moviesFilter)) {
            const moviesResponse: GenericResponse<MoviesResponse> = (await this.movieService.discoverMovies(movieFilter));
            if (moviesResponse.success) {
                this.movies = moviesResponse.data.results;
                this.totalMovies = moviesResponse.data.total_results;
                this.store.dispatch(setMoviesAction({ movies: this.movies }));
                this.store.dispatch(setTotalMovies({ totalMovies: this.totalMovies }));
            }
        }
        this.store.dispatch(setMoviesFilter({ moviesFilter: movieFilter }));
    }

    public setFavoriteMovies(movieFilter: MovieFilter): void {
        this.favoriteMovies = this.movieFilterService.applyFilters(this.movieState.favoriteMovies, movieFilter);
        this.totalFavoriteMovies = this.movieState.favoriteMovies.length;
        this.store.dispatch(setFavoriteMoviesFilter({ favoriteMoviesFilter: movieFilter }));
    }
}
