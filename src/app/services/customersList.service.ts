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
        return this.http.get('./assets/customers-sample.json').toPromise()
                .then((customers: Customer[]) => {
                    let customer = customers.filter(c => c.customerID == customerId)[0];
                    return customer;
                })
                .catch((err) => {
                    return err;
                });
    }

    getCustomers() {
        return this.http.get<{message: string, customers: Customer[]}>(this.url).toPromise();
    }

}
