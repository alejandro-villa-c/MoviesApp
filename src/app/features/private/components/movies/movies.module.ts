import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieFilterService } from 'src/app/shared/services/movie-filter.service';
import { MovieService } from 'src/app/shared/services/movie.service';
import { SharedModule } from '../../../../shared/shared.module';
import { MoviesGridModule } from '../movies-grid/movies-grid.module';
import { MoviesComponent } from './movies.component';

const routes: Routes = [
    {
        path: '',
        component: MoviesComponent
    },
    {
        path: 'detail/:movieId',
        loadChildren: () => import('../movie-detail/movie-detail.module').then(m => m.MovieDetailModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedModule,
        MoviesGridModule
    ],
    declarations: [MoviesComponent],
    providers: [
        MovieService,
        MovieFilterService
    ]
})
export class MoviesModule { }
