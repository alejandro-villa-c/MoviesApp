import { NgModule } from '@angular/core';
import { PrivatePageRoutingModule } from './private-page-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PrivatePageComponent } from './private-page.component';

@NgModule({
    imports: [
        PrivatePageRoutingModule,
        SharedModule
    ],
    declarations: [
        PrivatePageComponent,
    ]
})
export class PrivatePageModule { }
