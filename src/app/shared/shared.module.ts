import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        MenubarModule,
        DataViewModule,
        CardModule,
        TabViewModule,
        DropdownModule,
        RatingModule,
        MultiSelectModule
    ],
    declarations: [
    ],
    providers: [],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        MenubarModule,
        DataViewModule,
        CardModule,
        TabViewModule,
        DropdownModule,
        RatingModule,
        MultiSelectModule
    ]
})
export class SharedModule { }
