import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    constructor(private primengConfig: PrimeNGConfig) {}

    public ngOnInit(): void {
        this.primengConfig.ripple = true;
    }
}
