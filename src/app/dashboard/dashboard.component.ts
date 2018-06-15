import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { timestamp } from 'rxjs/operators/timestamp';
import { timeout } from 'rxjs/operators/timeout';


@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }
}
