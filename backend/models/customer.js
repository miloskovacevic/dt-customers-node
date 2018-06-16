const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
    
const customerSchema = mongoose.Schema({
    name: {
        first: {
            type: String
        },
        last: {
            type: String
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
        type: Number
    }
});


module.exports = mongoose.model('Customer', customerSchema);