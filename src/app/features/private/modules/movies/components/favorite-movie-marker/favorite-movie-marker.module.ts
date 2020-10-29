import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../../shared/shared.module';
import { MovieService } from '../../services/movie.service';
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
