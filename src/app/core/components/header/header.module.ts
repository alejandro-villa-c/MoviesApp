import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from 'src/app/features/public/modules/login/services/authentication.service';

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        SharedModule,
        CommonModule
    ],
    providers: [
        AuthenticationService
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule {}
