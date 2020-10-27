import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuardService } from './core/services/auth-guard.service';

const routes: Routes = [
    { path: '', redirectTo: 'private', pathMatch: 'full' },
    { path: 'public', loadChildren: () => import('./features/public/public-page.module').then(m => m.PublicPageModule) },
    {
        path: 'private',
        loadChildren: () => import('./features/private/private-page.module').then(m => m.PrivatePageModule),
        canActivate: [AuthGuardService] },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
