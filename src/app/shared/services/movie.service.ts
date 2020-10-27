import { Injectable } from '@angular/core';
import { GenericResponse } from 'src/app/core/models/GenericResponse';
import { HttpService } from 'src/app/core/services/http.service';
import { GenresResponse } from '../models/movies/GenresResponse';
import { MarkAsFavoriteBody } from '../models/movies/MarkAsFavoriteBody';
import { MarkAsFavoriteResponse } from '../models/movies/MarkAsFavoriteResponse';
import { Movie } from '../models/movies/Movie';
import { MovieFilter } from '../models/movies/MovieFilter';
import { MoviesResponse } from '../models/movies/MoviesResponse';

@Injectable()
export class MovieService {
    private discoverPath = 'discover';
    private moviePath = 'movie';
    private accountPath = 'account';
    private favoritePath = 'favorite';
    private genrePath = 'genre';

    constructor(
        private httpService: HttpService
    ) {}

    public async discoverMovies(movieFilter: MovieFilter): Promise<GenericResponse<MoviesResponse>> {
        const withGenres: string = movieFilter.with_genres.map(x => x.id).join(',');
        return await this.httpService.get<MoviesResponse>(
            `${this.discoverPath}/${this.moviePath}?page=${movieFilter.page}&sort_by=${movieFilter.sort_by}&vote_average.lte=${movieFilter.vote_average}&with_genres=${withGenres}`);
    }

    public async favoriteMovies(accountId: number, sessionId: string): Promise<Movie[]> {
        const favoriteMoviesFirstPage: MoviesResponse = (await this.getFavoriteMoviesByPage(accountId, sessionId, 1)).data;
        const favoriteMovies: Movie[] = [];
        favoriteMovies.push(...favoriteMoviesFirstPage.results);
        [...(Array(favoriteMoviesFirstPage.total_pages).keys())].forEach(async (page: number) => {
            if (page > 1) {
                favoriteMovies.push(
                    ...(await this.getFavoriteMoviesByPage(accountId, sessionId, page)).data.results
                );
            }
        });
        return favoriteMovies;
    }

    private async getFavoriteMoviesByPage(accountId: number, sessionId: string, page: number): Promise<GenericResponse<MoviesResponse>> {
        return (await this.httpService.get<MoviesResponse>(
            `${this.accountPath}/${accountId}/${this.favoritePath}/movies?session_id=${sessionId}&page=${page}`));
    }

    public async getGenres(): Promise<GenericResponse<GenresResponse>> {
        return await this.httpService.get<GenresResponse>(`${this.genrePath}/${this.moviePath}/list`);
    }

    public async markAsFavorite(
        accountId: number,
        sessionId: string,
        markAsFavoriteBody: MarkAsFavoriteBody
    ): Promise<GenericResponse<MarkAsFavoriteResponse>> {
        return await this.httpService.post<MarkAsFavoriteResponse, MarkAsFavoriteBody>(`${this.accountPath}/${accountId}/${this.favoritePath}?session_id=${sessionId}`, markAsFavoriteBody);
    }

    public async movieDetail(movieId: number): Promise<GenericResponse<Movie>> {
        return await this.httpService.get<Movie>(`${this.moviePath}/${movieId}`);
    }
}
