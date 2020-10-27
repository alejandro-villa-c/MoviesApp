import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MovieService } from 'src/app/shared/services/movie.service';
import { SharedModule } from '../../../../shared/shared.module';
import { FavoriteMovieMarkerModule } from '../favorite-movie-marker/favorite-movie-marker.module';
import { MoviesGridComponent } from './movies-grid.component';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FavoriteMovieMarkerModule
    ],
    declarations: [MoviesGridComponent],
    providers: [MovieService],
    exports: [MoviesGridComponent]
})
export class MoviesGridModule { }
