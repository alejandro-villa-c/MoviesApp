import { NgModule } from '@angular/core';
import { PublicPageRoutingModule } from './public-page-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PublicPageComponent } from './public-page.component';
import { LoginGuardService } from 'src/app/core/services/login-guard.service';

@NgModule({
    imports: [
        PublicPageRoutingModule,
        SharedModule
    ],
    declarations: [
        PublicPageComponent,
    ],
    providers: [
        LoginGuardService
    ]
})
export class PublicPageModule { }
