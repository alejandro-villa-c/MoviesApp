import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuardService } from 'src/app/core/services/login-guard.service';
import { PublicPageComponent } from './public-page.component';

const routes: Routes = [
    {
        path: '',
        component: PublicPageComponent,
        children: [
            { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) }
        ],
        canActivate: [LoginGuardService]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublicPageRoutingModule { }
