import { Injectable } from '@angular/core';
import { Customer } from './../common/models/customer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomersListService {

    url: string = 'http://localhost:3000/api/customers';

    constructor(private http: HttpClient) {
    }

    getCustomer(customerId: Number) {
        return this.http.get<{message: string, customer: Customer}>(this.url + '/' + customerId).toPromise();

        // return this.http.get('./assets/customers-sample.json').toPromise()
        //         .then((customers: Customer[]) => {
        //             let customer = customers.filter(c => c.customerID == customerId)[0];
        //             return customer;
        //         })
        //         .catch((err) => {
        //             return err;
        //         });
    }

    getCustomers() {
        return this.http.get<{message: string, customers: Customer[]}>(this.url).toPromise();
    }

    addCustomer(customer: Customer) {
        // save or update based on customer id
        if (customer.customerID == 0) {
            return this.http.post<{message: string, customer: Customer}>(this.url, customer).toPromise();
        } else {
            // update
            // return this.http.patch<{message: string, customer: Customer}>(this.url, customer).toPromise();
        }
    }

    deleteCustomer(customerId) {
         return this.http.delete<{message: string}>(this.url + '/' + customerId).toPromise();
    }

}
