export class LoginRequestBody {
    constructor(
        public username: string,
        public password: string,
        // tslint:disable-next-line: variable-name
        public request_token: string
    ) {}
}
