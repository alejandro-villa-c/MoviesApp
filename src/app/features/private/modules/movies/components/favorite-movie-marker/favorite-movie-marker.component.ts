import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { GenericResponse } from 'src/app/core/models/GenericResponse';
import { setFavoriteMovie } from 'src/app/core/store/actions/movie.actions';
import { LoginState } from 'src/app/core/store/models/LoginState';
import { MarkAsFavoriteBody } from '../../models/MarkAsFavoriteBody';
import { MarkAsFavoriteResponse } from '../../models/MarkAsFavoriteResponse';
import { Movie } from '../../models/Movie';
import { MovieService } from '../../services/movie.service';

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
