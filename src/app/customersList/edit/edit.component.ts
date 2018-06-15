import { SessionCacheHelper } from './../../common/helpers/sessionCacheHelper';
import { actionEnum } from './../../common/enums/actionEnum';
import { Customer } from './../../common/models/customer';
import { CustomersListService } from './../../services/customersList.service';
import { Component, ViewChild, OnInit, Injector, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';
import { FormControl } from '@angular/forms';

@Component({
    moduleId: module.id,
    templateUrl: 'edit.component.html'
})

export class EditComponent  implements OnInit, OnDestroy {
    public items: string[] = ['m', 'w'];

    public ngxControl = new FormControl();

    private _ngxDefaultTimeout;
    private _ngxDefaultInterval;
    private _ngxDefault;

    title: string;
    customer: Customer;
    customers: Customer[];
    activeRouter: ActivatedRoute;

    constructor(private injector: Injector, private _customersListService: CustomersListService, private router:Router) {
        this.customer = new Customer();

        // this._ngxDefaultTimeout = setTimeout(() => {
        //     this._ngxDefaultInterval = setInterval(() => {
        //         const idx = Math.floor(Math.random() * (this.items.length - 1));
        //         this._ngxDefault = this.items[idx];
        //         // console.log('new default value = ', this._ngxDefault);
        //     }, 2000);
        // }, 2000);


        this.activeRouter = injector.get(ActivatedRoute);
        this.title = 'Edit';

        this.customer.customerID = this.activeRouter.snapshot.params['id'];

        if (this.customer.customerID == null) {
            this.title = 'Add customer';
            this.customer.customerID = 0;
        } else {
            this.customer = (<Customer[]>SessionCacheHelper.getGridData('customers')).find(c => c.customerID == this.customer.customerID);
            // setting up right format for date picker...
            this.customer.birthday = new Date(this.customer.birthday);
            this.customer.lastContact = new Date(this.customer.lastContact);

            this.title = 'Edit customer';
        }
    }

    ngOnDestroy(): void {
        clearTimeout(this._ngxDefaultTimeout);
        clearInterval(this._ngxDefaultInterval);
    }

    ngOnInit() {

    }

    submit() {
        if (this.customer.birthday instanceof Date) {
            this.customer.birthday = this.customer.birthday.toISOString();
        }
        if (this.customer.lastContact instanceof Date) {
            this.customer.lastContact = this.customer.lastContact.toISOString();
        }
        this.customer.gender = this.ngxControl.value;

        // ovde dohvatim iz session cache helpera podatke zamjenim ih i snimim...
        this.saveCustomer(this.customer);
        console.log(this.customer);
    }

    saveCustomer(customer: Customer) {
        const data: Customer[] = SessionCacheHelper.getGridData('customers');

        if (customer.customerID == 0) {
            if (data[data.length - 1]) {
                customer.customerID = data[data.length - 1].customerID + 1;
            } else {
                customer.customerID = 1;
            }
            
            data.push(customer);
        } else {
            // edit
            const index = data.findIndex(x => x.customerID == customer.customerID);
            data[index] = customer;
        }

        SessionCacheHelper.setGridData('customers', data);
        this.router.navigate(['/customersList']);
    }

   

    getCustomer(customerId: Number) {

    }

    getCustomers() {

    }

    onInputChange() {

    }


    public doNgxDefault(): any {
        return this.customer.gender;
    }
 
    public inputTyped = (source: string, text: string) => console.log('SingleDemoComponent.inputTyped', source, text);
 
    public doSelect = (value: any) => console.log('SingleDemoComponent.doSelect', value);
 
    public doRemove = (value: any) => console.log('SingleDemoComponent.doRemove', value);
 
    public doSelectOptions = (options: INgxSelectOptions[]) => console.log('SingleDemoComponent.doSelectOptions', options);
}
