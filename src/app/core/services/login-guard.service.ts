import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginState } from '../store/models/LoginState';

@Injectable()
export class LoginGuardService implements CanActivate {
    public loginState: LoginState;
    constructor(private store: Store<{ loginState: LoginState }>, public router: Router) {
        this.store.select(state => state.loginState).subscribe((loginState: LoginState) => {
            this.loginState = loginState;
        });
    }

    public canActivate(): boolean {
        if (!!this.loginState.accountResponse) {
            this.router.navigate(['/private/movies']);
            return false;
        }
        return true;
    }
}
