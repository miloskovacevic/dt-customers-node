import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
 export const CUSTOMERS_OBJECT = [
{
  'customerID': 26,
  'name': {
    'first': 'John',
    'last': 'Smith'
  },
  'birthday': '1982-06-09',
  'gender': 'm',
  'lastContact': '2016-07-03T18:19:16.888Z',
  'customerLifetimeValue': 62.12
},
{
  'customerID': 36,
  'name': {
    'first': 'Ann',
    'last': 'Rodgers'
  },
  'birthday': '1989-02-11',
  'gender': 'w',
  'lastContact': '2017-07-03T18:19:16.888Z',
  'customerLifetimeValue': 74.36
}];

@Injectable()
export class CustomersMockService {
 public getCustomers(): Promise<any> {
    return Promise.resolve(CUSTOMERS_OBJECT);
  }
}
