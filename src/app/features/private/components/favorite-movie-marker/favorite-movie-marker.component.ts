import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { GenericResponse } from 'src/app/core/models/GenericResponse';
import { setFavoriteMovie } from 'src/app/core/store/actions/movie.actions';
import { LoginState } from 'src/app/core/store/models/LoginState';
import { MarkAsFavoriteBody } from 'src/app/shared/models/movies/MarkAsFavoriteBody';
import { MarkAsFavoriteResponse } from 'src/app/shared/models/movies/MarkAsFavoriteResponse';
import { Movie } from 'src/app/shared/models/movies/Movie';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
    selector: 'app-favorite-movie-marker',
    templateUrl: './favorite-movie-marker.component.html'
})
export class FavoriteMovieMarkerComponent {
    @Input() public movie: Movie;
    public loginState: LoginState;

    constructor(private movieService: MovieService, private store: Store<{ loginState: LoginState }>) {
        this.store.select(state => state.loginState).subscribe((loginState: LoginState) => {
            this.loginState = loginState;
        });
    }

    public async markAsFavorite(movie: Movie, favorite: boolean): Promise<void> {
        const markAsFavoriteResponse: GenericResponse<MarkAsFavoriteResponse> =
            await this.movieService.markAsFavorite(
                this.loginState.accountResponse.id,
                this.loginState.sessionId,
                new MarkAsFavoriteBody(movie.id, favorite)
            );
        if (markAsFavoriteResponse.success) {
            const movieClone = { ...movie };
            movieClone.isFavorite = favorite;
            this.store.dispatch(setFavoriteMovie({ favoriteMovie: movieClone }));
        }
    }
}
