import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { MovieService } from 'src/app/shared/services/movie.service';
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
