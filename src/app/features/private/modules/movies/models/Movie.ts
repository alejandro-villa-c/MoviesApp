export class Movie {
    constructor(
        public popularity: number,
        // tslint:disable-next-line: variable-name
        public vote_count: number,
        public video: boolean,
        // tslint:disable-next-line: variable-name
        public poster_path: string,
        public id: number,
        public adult: boolean,
        // tslint:disable-next-line: variable-name
        public backdrop_path: string,
        // tslint:disable-next-line: variable-name
        public original_language: string,
        // tslint:disable-next-line: variable-name
        public original_title: string,
        // tslint:disable-next-line: variable-name
        public genre_ids: Array<number>,
        public title: string,
        // tslint:disable-next-line: variable-name
        public vote_average: number,
        public overview: string,
        // tslint:disable-next-line: variable-name
        public release_date: string,
        public isFavorite: boolean
    ) {}
}
