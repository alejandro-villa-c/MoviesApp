import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MovieService } from 'src/app/shared/services/movie.service';
import { SharedModule } from '../../../../shared/shared.module';
import { FavoriteMovieMarkerComponent } from './favorite-movie-marker.component';

@NgModule({
    imports: [
        SharedModule,
        CommonModule
    ],
    declarations: [FavoriteMovieMarkerComponent],
    providers: [MovieService],
    exports: [FavoriteMovieMarkerComponent]
})
export class FavoriteMovieMarkerModule { }
