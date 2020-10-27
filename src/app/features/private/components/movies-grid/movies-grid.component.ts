import { AfterContentChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { defaultMovieFilter } from 'src/app/core/store/reducers/movie.reducer';
import { Genre } from 'src/app/shared/models/movies/Genre';
import { Movie } from 'src/app/shared/models/movies/Movie';
import { MovieFilter } from 'src/app/shared/models/movies/MovieFilter';
import { MovieSortOptions } from 'src/app/shared/models/movies/MovieSortOptions';

export const perPage = 20;

@Component({
    selector: 'app-movies-grid',
    templateUrl: './movies-grid.component.html'
})
export class MoviesGridComponent implements OnInit, AfterContentChecked, OnChanges {
    @Input() public movies: Array<Movie>;
    @Input() public totalRecords: number;
    @Input() public movieFilter: MovieFilter;
    @Input() public genres: Array<Genre>;
    @Input() public loading: boolean;
    @Input() public emptyMessage: string;
    @Output() public filterChange: EventEmitter<MovieFilter> = new EventEmitter();
    public perPage = perPage;
    public sortOptions: SelectItem[];
    public multiselectOptions: SelectItem[];
    public sortKey: string = null;
    public rating: number = null;
    public selectedGenres: Genre[] = [];

    public ngOnInit(): void {
        this.sortOptions = [
            {label: 'Mayor popularidad', value: MovieSortOptions.PopularityDesc},
            {label: 'Menor popularidad', value: MovieSortOptions.PopularityAsc},
            {label: 'Mejor calificadas', value: MovieSortOptions.VoteAverageDesc},
            {label: 'Peor calificadas', value: MovieSortOptions.VoteAverageAsc},
            {label: 'Alfabéticamente descendiente', value: MovieSortOptions.OriginalTitleDesc},
            {label: 'Alfabéticamente ascendiente', value: MovieSortOptions.OriginalTitleAsc},
            {label: 'Más recientes', value: MovieSortOptions.ReleaseDateDesc},
            {label: 'Más antiguas', value: MovieSortOptions.ReleaseDateAsc}
        ];
    }

    public ngAfterContentChecked(): void {
        this.setFiltersInitialValues();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.genres && changes.genres.currentValue !== changes.genres.previousValue) {
            this.multiselectOptions = this.genres.map(x => ({ label: x.name, value: { id: x.id, name: x.name } }));
        }
    }

    public setFiltersInitialValues(): void {
        this.sortKey = this.movieFilter.sort_by;
        this.rating = this.movieFilter.vote_average;
        this.selectedGenres = this.movieFilter.with_genres;
    }

    public changePage(event: any): void {
        const page: number = (event.first / this.perPage) + 1;
        const movieFilter: MovieFilter = { ...this.movieFilter };
        movieFilter.page = page;
        this.filterChange.emit(movieFilter);
    }

    public changeSort(event: any): void {
        const movieFilter: MovieFilter = { ...this.movieFilter };
        movieFilter.sort_by = event.value;
        this.filterChange.emit(movieFilter);
    }

    public changeRating(event: any): void {
        const movieFilter: MovieFilter = { ...this.movieFilter };
        movieFilter.vote_average = event.value;
        this.filterChange.emit(movieFilter);
    }

    public changeGenres(event: any): void {
        const movieFilter: MovieFilter = { ...this.movieFilter };
        movieFilter.with_genres = event.value;
        this.filterChange.emit(movieFilter);
    }

    public resetFilters(): void {
        const movieFilter: MovieFilter = { ...this.movieFilter };
        const newDefaultMovieFilter: MovieFilter = { ...defaultMovieFilter };
        newDefaultMovieFilter.page = movieFilter.page;
        this.sortKey = newDefaultMovieFilter.sort_by;
        this.rating = newDefaultMovieFilter.vote_average;
        this.selectedGenres = newDefaultMovieFilter.with_genres;
        this.filterChange.emit(newDefaultMovieFilter);
    }
}
