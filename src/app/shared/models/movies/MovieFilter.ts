import { Genre } from './Genre';

export class MovieFilter {
    constructor(
        public page: number,
        // tslint:disable-next-line: variable-name
        public sort_by: string,
        // tslint:disable-next-line: variable-name
        public vote_average: number,
        // tslint:disable-next-line: variable-name
        public with_genres: Array<Genre>
    ) {}
}
