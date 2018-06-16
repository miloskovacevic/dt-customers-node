

export class Customer {
    _id: number;
    customerID: number;
    name: Name;
    birthday: any;
    gender: string;
    lastContact: any;
    customerLifetimeValue: Number;

    constructor () {
        this._id = 0;
        this.customerID = null;
        this.name = new Name();
        this.birthday = null;
        this.gender = null;
        this.lastContact = null;
        this.customerLifetimeValue = null;
    }
}

class Name {
    first: string;
    last: string;
}
