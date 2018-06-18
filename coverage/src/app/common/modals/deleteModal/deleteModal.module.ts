import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoaderModule } from '../../common/loaders/loader.module';
import { DeleteModalComponent } from '../../common/modals/deleteModal.component';


@NgModule({
    imports: [
        ModalModule.forRoot(),
        CommonModule,
        LoaderModule
    ],
    declarations: [
        DeleteModalComponent
    ],
    exports: [DeleteModalComponent]
})
export class DeleteModalModule { }
