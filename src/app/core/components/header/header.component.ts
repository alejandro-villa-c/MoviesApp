import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LogoutResponse } from 'src/app/shared/models/authentication/LogoutResponse';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { GenericResponse } from '../../models/GenericResponse';
import { setAccountResponse, setRequestToken, setSessionId } from '../../store/actions/login.actions';
import { setFavoriteMoviesAction } from '../../store/actions/movie.actions';
import { LoginState } from '../../store/models/LoginState';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    public loginState: LoginState;
    constructor(
        private store: Store<{ loginState: LoginState }>,
        private authenticationService: AuthenticationService, private router: Router
    ) {
        this.store.select(state => state.loginState).subscribe((loginState: LoginState) => {
            this.loginState = loginState;
        });
    }

    public async logout(): Promise<void> {
        this.store.dispatch(setRequestToken({ requestToken: null }));
        this.store.dispatch(setSessionId({ sessionId: null }));
        this.store.dispatch(setAccountResponse({ accountResponse: null }));
        this.store.dispatch(setFavoriteMoviesAction({ favoriteMovies: [] }));
        const logoutResponse: GenericResponse<LogoutResponse> = await this.authenticationService.logout(this.loginState.sessionId);
        if (logoutResponse.success) {
            this.router.navigate(['/public/login']);
        }
    }
}
