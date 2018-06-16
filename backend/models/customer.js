const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
    
const customerSchema = mongoose.Schema({
    name: {
        first: {
            type: String,
            required: 'You must enter first name.'
        },
        last: {
            type: String,
            required: 'You must enter last name.'
        },
    },
    lastContact: {
        type: Date,
        default: Date.now
    },
    birthday: {
        type: Date,
        default: Date.now
    },
    gender: {
        type: String,
        default: 'm'
    },
    customerLifetimeValue: {
        type: Number,
        required: 'You must provide Customer Lifetime Value.'
    }
});


module.exports = mongoose.model('Customer', customerSchema);