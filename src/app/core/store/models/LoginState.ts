import { AccountResponse } from 'src/app/features/public/modules/login/models/AccountResponse';

export class LoginState {
    constructor(
        public requestToken: string,
        public sessionId: string,
        public accountResponse: AccountResponse
    ) {}
}
