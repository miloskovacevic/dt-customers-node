import { LoaderComponent } from './../../common/loaders/loader.component';
import { SessionCacheHelper } from './../../common/helpers/sessionCacheHelper';
import { actionEnum } from './../../common/enums/actionEnum';
import { Customer } from './../../common/models/customer';
import { CustomersListService } from './../../services/customersList.service';
import { Component, ViewChild, OnInit, Injector, HostListener, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    moduleId: module.id,
    templateUrl: 'edit.component.html',
    styleUrls: ['./edit.component.scss']
})

export class EditComponent  implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('loader') public loader: LoaderComponent;

    public items: string[] = ['m', 'w'];

    public ngxControl = new FormControl();

    private _ngxDefaultTimeout;
    private _ngxDefaultInterval;
    private _ngxDefault;

    title: string = 'Add customer';
    customer: Customer;
    customers: Customer[];
    activeRouter: ActivatedRoute;

    constructor(private injector: Injector, private _customersListService: CustomersListService, private router: Router, 
                private elem: ElementRef) {
        this.customer = new Customer();

        this.activeRouter = injector.get(ActivatedRoute);
        this.customer._id = this.activeRouter.snapshot.params['id'];
    }

    ngOnDestroy(): void {
        clearTimeout(this._ngxDefaultTimeout);
        clearInterval(this._ngxDefaultInterval);
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (this.customer._id == null) {
            this.title = 'Add customer';
            this.customer._id = 0;
        } else {
            // geting data for one customer
            this.getCustomer(this.customer._id);
            this.title = 'Edit customer';
        }
    }

    submit() {
        // remove errors if exist from html template
        this.removeErrors();

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
            this.router.navigate(['/customersList']);
        })
        .catch((err: HttpErrorResponse) => {
            if (!err.error)
                return;
            this.errorHandler(err.error.errors);
        });
    }

    getCustomer(customerId: Number) {
        this.loader.show();
        this._customersListService.getCustomer(customerId).then((payload: {message: string, customer: Customer}) => {
            console.log(payload);
            this.customer = payload.customer;
            // setting up right format for date picker...
            this.customer.birthday = new Date(this.customer.birthday);
            this.customer.lastContact = new Date(this.customer.lastContact);
            setTimeout(() => {
                this.loader.hide();
            }, 300);
        });
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

    errorHandler(errorJson) {
        Object.keys(errorJson).forEach((k) => {
            console.log(errorJson[k]);
            const htmlElement: HTMLElement =  document.getElementById(k);
            htmlElement.innerHTML = errorJson[k].message;
        });
    }

    removeErrors() {
         let els = this.elem.nativeElement.querySelectorAll('.errorMessage');
         els.forEach((el: HTMLElement) => {
            el.innerText = '';
         });
    }
}
