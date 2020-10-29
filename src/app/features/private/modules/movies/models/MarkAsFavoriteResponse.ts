export class MarkAsFavoriteResponse {
    constructor(
        public success: boolean,
        // tslint:disable-next-line: variable-name
        public status_code: number,
        // tslint:disable-next-line: variable-name
        public status_message: string,
    ) {}
}
