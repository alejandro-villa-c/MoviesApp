import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../../../shared/shared.module';
import { MovieService } from '../../services/movie.service';
import { FavoriteMovieMarkerModule } from '../favorite-movie-marker/favorite-movie-marker.module';
import { MovieDetailComponent } from './movie-detail.component';

const routes: Routes = [
    {
        path: '',
        component: MovieDetailComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedModule,
        FavoriteMovieMarkerModule
    ],
    declarations: [MovieDetailComponent],
    providers: [
        MovieService
    ]
})
export class MovieDetailModule { }
