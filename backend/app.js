const customers = require('./data/customers-sample.json')
const express = require('express');
const app = express();

// disable cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Header', 
                  'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/api/customers', (req, res, next) => {

    res.status(200).json({
        message: 'Customers fetched successfully!',
        customers: customers
    });
});

module.exports = app;