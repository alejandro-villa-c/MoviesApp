import { perPage } from '../../components/movies-grid/movies-grid.component';
import { Movie } from '../../models/Movie';

export default class MoviePaginator {
    constructor(
        public movies: Movie[]
    ) {}

    public paginate(page: number): Movie[] {
        const fromRecord: number = ((perPage * page) - perPage);
        const toRecord: number = (perPage * page);
        return this.movies.slice(fromRecord, toRecord);
    }
}