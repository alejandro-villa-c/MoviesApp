import { Genre } from './Genre';

export class GenresResponse {
    constructor(
        public genres: Array<Genre>
    ) {}
}
