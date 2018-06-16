import { SessionCacheHelper } from './../../common/helpers/sessionCacheHelper';
import { actionEnum } from './../../common/enums/actionEnum';
import { Customer } from './../../common/models/customer';
import { CustomersListService } from './../../services/customersList.service';
import { Component, ViewChild, OnInit, Injector, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';
import { FormControl } from '@angular/forms';
import { HttpErrorResponse } from "@angular/common/http";

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

    constructor(private injector: Injector, private _customersListService: CustomersListService, private router: Router) {
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

        this.customer._id = this.activeRouter.snapshot.params['id'];

        if (this.customer._id == null) {
            this.title = 'Add customer';
            this.customer._id = 0;
        } else {
            // geting data for one customer
            this.getCustomer(this.customer._id);
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
    }

    saveCustomer(customer: Customer) {
        this._customersListService.addCustomer(customer)
        .then((response) => {
            // put this in some kind of modal...
            console.log(response.customer);
            this.router.navigate(['/customersList']);
        })
        .catch((err: HttpErrorResponse) => {
            console.log(err.error.errors);

        });
    }

    getCustomer(customerId: Number) {
        this._customersListService.getCustomer(customerId).then((payload: {message: string, customer: Customer}) => {
            console.log(payload);
            this.customer = payload.customer;
            // setting up right format for date picker...
            this.customer.birthday = new Date(this.customer.birthday);
            this.customer.lastContact = new Date(this.customer.lastContact);
        });
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
