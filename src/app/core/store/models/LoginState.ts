import { AccountResponse } from 'src/app/shared/models/authentication/AccountResponse';

export class LoginState {
    constructor(
        public requestToken: string,
        public sessionId: string,
        public accountResponse: AccountResponse
    ) {}
}
