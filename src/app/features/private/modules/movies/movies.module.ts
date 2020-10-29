import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieFilterService } from 'src/app/features/private/modules/movies/services/movie-filter.service';
import { SharedModule } from '../../../../shared/shared.module';
import { MoviesGridModule } from './components/movies-grid/movies-grid.module';
import { MoviesComponent } from './movies.component';
import { MovieService } from './services/movie.service';

const routes: Routes = [
    {
        path: '',
        component: MoviesComponent
    },
    {
        path: 'detail/:movieId',
        loadChildren: () => import('./components/movie-detail/movie-detail.module').then(m => m.MovieDetailModule)
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
