import { Injectable } from '@angular/core';
import { Customer } from './../common/models/customer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomersListService {

    url: string = 'http://localhost:3000/api/customers';

    constructor(private http: HttpClient) {
    }

    getCustomers() {
        return this.http.get<{message: string, customers: Customer[]}>(this.url).toPromise();
    }

    getCustomer(customerId: Number) {
        return this.http.get<{message: string, customer: Customer}>(this.url + '/' + customerId).toPromise();
    }

    addCustomer(customer: Customer) {
        // save or update based on customer id
        if (customer._id == 0 || customer._id == null) {
            // save
            delete customer._id;
            return this.http.post<{message: string, customer: Customer}>(this.url, customer).toPromise();
        } else {
            // update
            return this.http.patch<{message: string, customer: Customer}>(this.url + '/' + customer._id, customer).toPromise();
        }
    }

    deleteCustomer(customerId) {
         return this.http.delete<{message: string}>(this.url + '/' + customerId).toPromise();
    }

}
