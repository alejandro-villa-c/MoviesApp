export class SessionResponse {
    constructor(
        public success: boolean,
        // tslint:disable-next-line: variable-name
        public session_id: string
    ) {}
}
