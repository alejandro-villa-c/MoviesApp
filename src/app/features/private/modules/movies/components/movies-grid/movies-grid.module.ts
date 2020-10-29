import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../../shared/shared.module';
import { MovieService } from '../../services/movie.service';
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
