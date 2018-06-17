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
    title: String = 'Webtrekk Customers List';

    constructor(private _customersListService: CustomersListService, private router: Router) {
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
           //  { name: 'CustomerID', prop: 'customerID', minWidth: 100 },
            { name: 'First Name', prop: 'name.first', minWidth: 100 },
            { name: 'Last Name', prop: 'name.last', minWidth: 100 },
            { name: 'Last Contact', prop: 'lastContact', minWidth: 200 },
            { name: 'Customer Lifetime Value', prop: 'customerLifetimeValue', minWidth: 200 },
            { name: 'Actions', prop: '_id', sortable: false, minWidth: 100, maxWidth: 150, resizeable: false, cellTemplate: this.actionColumn }
          ];
    }

    getData() {
        this._customersListService.getCustomers()
        .then((data) => {
            this.data = data.customers;
            this.rows = this.data;
            SessionCacheHelper.setGridData('customers', this.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    onRouteClick() {
        this.router.navigate(['/customersList/add']);
    }

    deleteResource(customerID: number) {
        this._customersListService.deleteCustomer(customerID)
        .then((response) => {
            // repsonse should be in some kind of modal
            // here i call getemployees() to refresh data...
            this.getData();
        })
        .catch((err) => {
            // errors should be displayed in some kind of modal...
            console.log(err);
        });

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
