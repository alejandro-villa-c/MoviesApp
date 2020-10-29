import { Movie } from './Movie';

export class MoviesResponse {
    constructor(
        public page: number,
        // tslint:disable-next-line: variable-name
        public total_results: number,
        // tslint:disable-next-line: variable-name
        public total_pages: number,
        public results: Array<Movie>
    ) {}
}
