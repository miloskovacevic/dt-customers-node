import { SharedModule } from './../shared.module';
import { CustomersListComponent } from './customersList.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersListRoutingModule } from './customersList-routing.module';
import { EditComponent } from './edit/edit.component';
// import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgxSelectModule } from 'ngx-select-ex';

@NgModule({
    imports: [
        CommonModule,
        CustomersListRoutingModule,
        SharedModule,
        // BsDatepickerModule.forRoot(),
        NgxSelectModule
    ],
    declarations: [
        CustomersListComponent,
        EditComponent
    ]
})
export class CustomersListModule { }
