import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MovieState } from 'src/app/core/store/models/MovieState';
import { Genre } from '../../models/Genre';
import { Movie } from '../../models/Movie';
import { MovieService } from '../../services/movie.service';

@Component({
    selector: 'app-movie-detail',
    templateUrl: './movie-detail.component.html'
})
export class MovieDetailComponent implements OnInit, OnDestroy {
    public movie: Movie = null;
    public genres: string = null;
    public movieState: MovieState;
    private routeSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private store: Store<{ movieState: MovieState }>,
        private movieService: MovieService
    ) { }

    public ngOnInit(): void {
        this.routeSubscription = this.route.params.subscribe(async (params) => {
            const movieId: number = +(params.movieId);
            let genres: Genre[] = [];
            this.store.select(state => state.movieState).subscribe((movieState: MovieState) => {
                this.movieState = movieState;
                this.movie = { ...this.movieState.movies.find(x => x.id === movieId) };
                genres = [ ...this.movieState.genres ];
            });
            if (!this.movie || Object.keys(this.movie).length === 0) {
                this.movie = (await this.movieService.movieDetail(movieId)).data;
            }
            if (!this.genres || this.genres.length === 0) {
                genres = (await this.movieService.getGenres()).data.genres;
            }
            this.genres = genres.filter((genre: Genre) => {
                return (this.movie.genre_ids || this.movie.genres.map(x => x.id)).includes(genre.id);
            }).map(x => x.name).join(', ');
            this.movie.isFavorite = this.movieState.favoriteMovies.map(x => x.id).includes(this.movie.id);
        });
    }

    public ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
    }
}
