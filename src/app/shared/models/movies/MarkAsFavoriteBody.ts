export class MarkAsFavoriteBody {
    constructor(
        // tslint:disable-next-line: variable-name
        public media_id: number,
        public favorite: boolean,
        // tslint:disable-next-line: variable-name
        public media_type: string = 'movie'
    ) {}
}
