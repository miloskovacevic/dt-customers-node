import { LoaderModule } from './common/loaders/loader.module';
import { DeleteModalModule } from './common/modals/deleteModal/deleteModal.module';
import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';

// import { WarningModalModule } from './common/modals/warningModal/warningModal.module';
import { SelectModule } from 'ng2-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SelectModule,
        DataTableModule,
        NgxDatatableModule,
        LoaderModule,
        DeleteModalModule
    ],
    providers: [
    ]
})
export class SharedModule { }
