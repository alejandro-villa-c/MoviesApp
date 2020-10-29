import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MovieState } from 'src/app/core/store/models/MovieState';
import { Movie } from '../../models/Movie';
import { MovieService } from '../../services/movie.service';

@Component({
    selector: 'app-movie-detail',
    templateUrl: './movie-detail.component.html'
})
export class MovieDetailComponent implements OnInit, OnDestroy {
    public movie: Movie = null;
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
            this.store.select(state => state.movieState).subscribe((movieState: MovieState) => {
                this.movieState = movieState;
                this.movie = { ...this.movieState.movies.find(x => x.id === movieId) };
            });
            if (!this.movie || Object.keys(this.movie).length === 0) {
                this.movie = (await this.movieService.movieDetail(movieId)).data;
            }
            this.movie.isFavorite = this.movieState.favoriteMovies.map(x => x.id).includes(this.movie.id);
        });
    }

    public ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
    }
}
