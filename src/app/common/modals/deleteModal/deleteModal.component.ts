import { Component, ViewChild } from '@angular/core';
import { LoaderComponent } from '../../../common/loaders/loader.component';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    moduleId: module.id,
    selector: 'delete-modal',
    templateUrl: 'deleteModal.component.html',
    exportAs: 'deleteModal'
})

export class DeleteModalComponent {
    @ViewChild('deleteModal') public deleteModal: ModalDirective;
    @ViewChild('loader') public loader: LoaderComponent;

    onDeleteConfirm: Function;
    localization: any;

    constructor() {
    }

    getLocalization(key: string) {
        return this.localization[key] == null ? key : this.localization[key];
    }

    show(onConfirm: Function) {
        this.loader.hide();
        this.deleteModal.show();
        this.onDeleteConfirm = onConfirm;
    }

    hide() {
        this.deleteModal.hide();
    }

    onDelete() {
        this.onDeleteConfirm();
    }
}
