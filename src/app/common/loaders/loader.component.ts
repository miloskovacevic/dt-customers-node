import { Component } from '@angular/core';


@Component({
    moduleId: module.id,
    selector: 'loader',
    templateUrl: 'loader.component.html',
    styleUrls: ['./loader.component.scss'],
    exportAs: 'loader'
})

export class LoaderComponent {
    public showLoader: Boolean = false;
    public showLoaderSmall: Boolean = false;
    public showLoaderFull: Boolean = false;
    public hideLoaderContent: Boolean = false;
    public showLoaderFullHeight: Boolean = false;

    show() {
        this.showLoader = true;
    }

    showSmall() {
        this.showLoaderSmall = true;
    }

    showFull() {
        this.showLoaderFull = true;
    }

    showFullHeight() {
        this.showLoaderFullHeight = true;
        this.hideLoaderContent = true;
    }

    hide() {
        this.showLoader = this.showLoaderSmall = this.showLoaderFull = this.showLoaderFullHeight = false;
    }
}
