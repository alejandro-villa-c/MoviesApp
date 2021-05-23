export class TokenResponse {
    constructor(
        public success: boolean,
        // tslint:disable-next-line: variable-name
        public request_token: string
    ) {}
}
