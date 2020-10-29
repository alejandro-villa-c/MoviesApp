import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivatePageComponent } from './private-page.component';

const routes: Routes = [
    {
        path: '',
        component: PrivatePageComponent,
        children: [
            { path: '', redirectTo: 'movies', pathMatch: 'full' },
            { path: 'movies', loadChildren: () => import('./modules/movies/movies.module').then(m => m.MoviesModule) }
        ]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrivatePageRoutingModule { }
