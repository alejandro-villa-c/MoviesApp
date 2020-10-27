import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { GenericResponse } from 'src/app/core/models/GenericResponse';
import { setAccountResponse, setRequestToken, setSessionId } from 'src/app/core/store/actions/login.actions';
import { LoginState } from 'src/app/core/store/models/LoginState';
import { AccountResponse } from 'src/app/shared/models/authentication/AccountResponse';
import { LoginRequestBody } from 'src/app/shared/models/authentication/LoginRequestBody';
import { SessionRequestBody } from 'src/app/shared/models/authentication/SessionRequestBody';
import { SessionResponse } from 'src/app/shared/models/authentication/SessionResponse';
import { TokenResponse } from 'src/app/shared/models/authentication/TokenResponse';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';
import { MovieState } from 'src/app/core/store/models/MovieState';
import { setFavoriteMoviesAction } from 'src/app/core/store/actions/movie.actions';
import { Movie } from 'src/app/shared/models/movies/Movie';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    public loginForm: FormGroup = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
    });
    public movieState: MovieState;

    constructor(
        private authenticationService: AuthenticationService,
        private store: Store<{ loginState: LoginState, movieState: MovieState }>,
        private router: Router,
        private movieService: MovieService
    ) {
        this.store.select(state => state.movieState).subscribe((movieState: MovieState) => {
            this.movieState = movieState;
        });
    }

    public async login(): Promise<void> {
        const tokenResponse: GenericResponse<TokenResponse> = await this.authenticationService.getRequestToken();
        if (tokenResponse.success) {
            this.store.dispatch(setRequestToken({ requestToken: tokenResponse.data.request_token }));
            const loginRequestBody: LoginRequestBody = this.loginForm.value as LoginRequestBody;
            loginRequestBody.request_token = tokenResponse.data.request_token;
            const validatedTokenResponse: GenericResponse<TokenResponse> = await this.authenticationService.login(loginRequestBody);
            if (validatedTokenResponse.success) {
                this.store.dispatch(setRequestToken({ requestToken: validatedTokenResponse.data.request_token }));
                const sessionRequestBody: SessionRequestBody = new SessionRequestBody(validatedTokenResponse.data.request_token);
                const sessionResponse: GenericResponse<SessionResponse> = await this.authenticationService.getSessionId(sessionRequestBody);
                if (sessionResponse.success) {
                    this.store.dispatch(setSessionId({ sessionId: sessionResponse.data.session_id }));
                    const accountResponse: GenericResponse<AccountResponse> =
                        await this.authenticationService.getAccountDetails(sessionResponse.data.session_id);
                    if (accountResponse.success) {
                        this.store.dispatch(setAccountResponse({ accountResponse: accountResponse.data }));
                        await this.setFavoriteMovies(accountResponse.data.id, sessionResponse.data.session_id);
                        this.router.navigate(['/private/movies']);
                    }
                }
            }
        }
    }

    private async setFavoriteMovies(accountId: number, sessionId: string): Promise<void> {
        const favoriteMovies: Movie[] = (await this.movieService.favoriteMovies(
            accountId,
            sessionId)
        ).map((favoriteMovie: Movie) => {
            favoriteMovie.isFavorite = true;
            return favoriteMovie;
        });
        this.store.dispatch(setFavoriteMoviesAction({
            favoriteMovies
        }));
    }
}
