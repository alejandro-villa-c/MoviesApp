import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { GenericResponse } from 'src/app/core/models/GenericResponse';
import { setAccountResponse, setRequestToken, setSessionId } from 'src/app/core/store/actions/login.actions';
import { LoginState } from 'src/app/core/store/models/LoginState';
import { AccountResponse } from 'src/app/features/public/modules/login/models/AccountResponse';
import { AuthenticationService } from 'src/app/features/public/modules/login/services/authentication.service';
import { Router } from '@angular/router';
import { MovieState } from 'src/app/core/store/models/MovieState';
import { setFavoriteMoviesAction } from 'src/app/core/store/actions/movie.actions';
import { MovieService } from 'src/app/features/private/modules/movies/services/movie.service';
import { TokenResponse } from './models/TokenResponse';
import { SessionResponse } from './models/SessionResponse';
import { LoginRequestBody } from './models/LoginRequestBody';
import { SessionRequestBody } from './models/SessionRequestBody';
import { Movie } from 'src/app/features/private/modules/movies/models/Movie';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    public loginForm: FormGroup = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
    });

    constructor(
        private authenticationService: AuthenticationService,
        private store: Store<{ loginState: LoginState, movieState: MovieState }>,
        private router: Router,
        private movieService: MovieService
    ) {}

    public async login(): Promise<void> {
        const loginStatus: LoginStatus = new LoginStatus(this.authenticationService, this.store, this.movieService, this.router, this.loginForm);
        const requestToken: RequestToken = new RequestToken();
        const login: Login = new Login();
        const session: Session = new Session();
        const accountDetails: AccountDetails = new AccountDetails();
        const favoriteMovies: FavoriteMovies = new FavoriteMovies();
        requestToken.succeedWith(login);
        login.succeedWith(session);
        session.succeedWith(accountDetails);
        accountDetails.succeedWith(favoriteMovies);
        requestToken.check(loginStatus);
    }
}

class LoginStatus {
    constructor(
        public authenticationService: AuthenticationService,
        public store: Store<{ loginState: LoginState, movieState: MovieState }>,
        public movieService: MovieService,
        public router: Router,
        public loginForm: FormGroup,
        public requestTokenResponse: TokenResponse = null,
        public loginResponse: TokenResponse = null,
        public sessionResponse: SessionResponse = null,
        public accountResponse: AccountResponse = null
    ) {}
}

abstract class LoginChecker {
    public successor: LoginChecker = null;

    public abstract check(loginStatus: LoginStatus): Promise<void>;

    public succeedWith(successor: LoginChecker): void {
        this.successor = successor;
    }

    public next(loginStatus: LoginStatus): void {
        if (this.successor) {
            this.successor.check(loginStatus);
        }
    }
}

class RequestToken extends LoginChecker {
    public async check(loginStatus: LoginStatus): Promise<void> {
        const tokenResponse: GenericResponse<TokenResponse> = await loginStatus.authenticationService.getRequestToken();
        if (tokenResponse.success) {
            loginStatus.requestTokenResponse = tokenResponse.data;
            this.next(loginStatus);
        }
    }
}

class Login extends LoginChecker {
    public async check(loginStatus: LoginStatus): Promise<void> {
        loginStatus.store.dispatch(setRequestToken({ requestToken: loginStatus.requestTokenResponse.request_token }));
        const loginRequestBody: LoginRequestBody = loginStatus.loginForm.value as LoginRequestBody;
        loginRequestBody.request_token = loginStatus.requestTokenResponse.request_token;
        const validatedTokenResponse: GenericResponse<TokenResponse> = await loginStatus.authenticationService.login(loginRequestBody);
        if (validatedTokenResponse.success) {
            loginStatus.loginResponse = validatedTokenResponse.data;
            this.next(loginStatus);
        }
    }
}

class Session extends LoginChecker {
    public async check(loginStatus: LoginStatus): Promise<void> {
        loginStatus.store.dispatch(setRequestToken({ requestToken: loginStatus.loginResponse.request_token }));
        const sessionRequestBody: SessionRequestBody = new SessionRequestBody(loginStatus.loginResponse.request_token);
        const sessionResponse: GenericResponse<SessionResponse> = await loginStatus.authenticationService.getSessionId(sessionRequestBody);
        if (sessionResponse.success) {
            loginStatus.sessionResponse = sessionResponse.data;
            this.next(loginStatus);
        }
    }
}

class AccountDetails extends LoginChecker {
    public async check(loginStatus: LoginStatus): Promise<void> {
        loginStatus.store.dispatch(setSessionId({ sessionId: loginStatus.sessionResponse.session_id }));
        const accountResponse: GenericResponse<AccountResponse> = await loginStatus.authenticationService.getAccountDetails(loginStatus.sessionResponse.session_id);
        if (accountResponse.success) {
            loginStatus.accountResponse = accountResponse.data;
            this.next(loginStatus);
        }
    }
}

class FavoriteMovies extends LoginChecker {
    public async check(loginStatus: LoginStatus): Promise<void> {
        loginStatus.store.dispatch(setAccountResponse({ accountResponse: loginStatus.accountResponse }));
        await this.setFavoriteMovies(loginStatus.store, loginStatus.movieService, loginStatus.accountResponse.id, loginStatus.sessionResponse.session_id);
        loginStatus.router.navigate(['/private/movies']);
    }

    private async setFavoriteMovies(
        store: Store<{ loginState: LoginState, movieState: MovieState }>, 
        movieService: MovieService, 
        accountId: number, 
        sessionId: string): Promise<void> {
        const favoriteMovies: Movie[] = (await movieService.favoriteMovies(
            accountId,
            sessionId)
        ).map((favoriteMovie: Movie) => {
            favoriteMovie.isFavorite = true;
            return favoriteMovie;
        });
        store.dispatch(setFavoriteMoviesAction({
            favoriteMovies
        }));
    }
}
