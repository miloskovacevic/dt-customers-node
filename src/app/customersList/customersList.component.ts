import { SessionCacheHelper } from './../common/helpers/sessionCacheHelper';
import { CustomersListService } from './../services/customersList.service';
import { Customer } from './../common/models/customer';
import { Component, OnInit, HostListener, AfterContentInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { timestamp } from 'rxjs/operators/timestamp';
import { timeout } from 'rxjs/operators/timeout';
import { DeleteModalComponent } from './../common/modals/deleteModal/deleteModal.component';


@Component({
    templateUrl: './customersList.component.html'
})
export class CustomersListComponent implements OnInit, AfterContentInit {

    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('actionColumn') actionColumn: TemplateRef<any>;
    @ViewChild('deleteModal') public deleteModal: DeleteModalComponent;

    public data: Array<Customer> = new Array<Customer>();
    public filter = '';
    rows = [];
    columns = [];
    sorts = [];

    constructor(private _customersListService: CustomersListService) {
    }

    ngOnInit() {
    }

    ngAfterContentInit() {
        this.getData();
        this.sorts = [{
            prop: 'customerID',
            dir: 'asc'
        }];
        this.columns = [
            { name: 'CustomerID', prop: 'customerID', minWidth: 100 },
            { name: 'First Name', prop: 'name.first', minWidth: 100 },
            { name: 'Last Name', prop: 'name.last', minWidth: 100 },
            { name: 'Last Contact', prop: 'lastContact', minWidth: 200 },
            { name: 'Customer Lifetime Value', prop: 'customerLifetimeValue', minWidth: 200 },
            { name: 'Actions', prop: 'customerID', sortable: false, minWidth: 100, maxWidth: 150, resizeable: false, cellTemplate: this.actionColumn }
          ];
    }

    getData() {
        console.log('trazim podatke...');
        // if (!SessionCacheHelper.getGridData('customers')) {
        //     this._customersListService.getCustomers()
        //     .then((customers: Customer[]) => {
        //         this.data = customers;
        //         this.rows = this.data;
        //         SessionCacheHelper.setGridData('customers', this.data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        // } else {
        //     this.data = SessionCacheHelper.getGridData('customers');
        //     this.rows = this.data;
        // }
        if (!SessionCacheHelper.getGridData('customers')) {
            this._customersListService.getCustomers()
            .then((data) => {
                console.log(data);
                this.data = data.customers;
                this.rows = this.data;
                SessionCacheHelper.setGridData('customers', this.data);
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            this.data = SessionCacheHelper.getGridData('customers');
            this.rows = this.data;
        }
    }

    onRouteClick() {

    }

    deleteResource(customerID: number) {
        const data: Customer[] = SessionCacheHelper.getGridData('customers');
        // confirm('Da li zelite da izbrisete customera? ');
        const index = data.indexOf(data.find(d => d.customerID == customerID));
        data.splice(index, 1);
        SessionCacheHelper.setGridData('customers', data);
        this.rows = data;

        // this.deleteModal.show(() => {
        //     // this.deleteModal.loader.show();
        
        //     // this._userService.deleteUser(userId)
        //     //     .then((data) => {
        //     //         //SessionCacheHelper.setGridData('users', null);
        //     //         this.getData(true);
        //     //         //SessionCacheHelper.getCacheData('users', this.table, this.filter);
        //     //         this.deleteModal.loader.hide();
        //     //         this.deleteModal.hide();
        //     //         //this.showPopupMessage(data);
        //     //     })
        //     //     .catch((err) => {
        //     //         // this.showPopupMessage(err);
        //     //         // this.deleteModal.loader.hide();
        //     //         // this.deleteModal.hide();
        //     //     });
        // });
    }
}
