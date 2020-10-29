import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieService } from 'src/app/features/private/modules/movies/services/movie.service';
import { AuthenticationService } from 'src/app/features/public/modules/login/services/authentication.service';
import { SharedModule } from '../../../../shared/shared.module';
import { LoginComponent } from './login.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [LoginComponent],
    providers: [
        AuthenticationService,
        MovieService
    ]
})
export class LoginModule { }
