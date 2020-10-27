import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { HeaderModule } from './components/header/header.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        HeaderModule
    ],
    providers: [
        MessageService
    ],
    exports: [
        HeaderComponent
    ]
})
export class CoreModule {}
