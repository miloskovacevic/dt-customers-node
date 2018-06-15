const customers  = require('./data/customers-sample.json')
const express    = require('express');
const bodyParser = require('body-parser');

const app = express();

// including pody parser
app.use(bodyParser.json());

// disable cors
app.use((req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Header', 
    //               'Origin, X-Requested-With, Content-Type, Accept');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    next();
});

// POST /api/customers
app.post('/api/customers', (req, res, next) => {
    const customer = req.body;
    res.status(201).json({
        message: 'Post added successfully',
        customer: customer
  })
});

// GET /api/customers
app.get('/api/customers', (req, res, next) => {

    res.status(200).json({
        message: 'Customers fetched successfully!',
        customers: customers
    });
});

module.exports = app;