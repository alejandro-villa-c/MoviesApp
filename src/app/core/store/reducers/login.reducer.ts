import { Action, createReducer, on } from '@ngrx/store';
import { setAccountResponse, setRequestToken, setSessionId } from '../actions/login.actions';
import { LoginState } from '../models/LoginState';

export const initialState: LoginState = {
    requestToken: null,
    sessionId: atob(sessionStorage.getItem('session-id')) || null,
    accountResponse: JSON.parse(atob(sessionStorage.getItem('account-details') || btoa('null'))) || null
};

// tslint:disable-next-line: variable-name
const _loginReducer = createReducer(
    initialState,
    on(setRequestToken, (state: LoginState, { requestToken }) => {
        return { ...state, requestToken };
    }),
    on(setSessionId, (state: LoginState, { sessionId }) => {
        const loginState = { ...state, sessionId };
        sessionStorage.setItem('session-id', btoa(loginState.sessionId));
        return loginState;
    }),
    on(setAccountResponse, (state: LoginState, { accountResponse }) => {
        const loginState = { ...state, accountResponse };
        sessionStorage.setItem('account-details', btoa(JSON.stringify(loginState.accountResponse)));
        return loginState;
    })
);

export function loginReducer(state: LoginState, action: Action): LoginState {
    return _loginReducer(state, action);
}
