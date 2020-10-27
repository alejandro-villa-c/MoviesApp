import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from './core/core.module';
import { ToastModule } from 'primeng/toast';
import { loginReducer } from './core/store/reducers/login.reducer';
import { AuthGuardService } from './core/services/auth-guard.service';
import { movieReducer } from './core/store/reducers/movie.reducer';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CoreModule,
        AppRoutingModule,
        ToastModule,
        StoreModule.forRoot({ loginState: loginReducer, movieState: movieReducer })
    ],
    providers: [AuthGuardService],
    bootstrap: [AppComponent]
})
export class AppModule { }
