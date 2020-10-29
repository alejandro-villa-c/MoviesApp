import { Genre } from './Genre';
import { MovieSortOptions } from '../filters/sorting/MovieSortOptions';

export class MovieFilter {
    constructor(
        public page: number,
        // tslint:disable-next-line: variable-name
        public sort_by: MovieSortOptions,
        // tslint:disable-next-line: variable-name
        public vote_average: number,
        // tslint:disable-next-line: variable-name
        public with_genres: Array<Genre>
    ) {}
}
