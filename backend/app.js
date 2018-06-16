// const customers  = require('./data/customers-sample.json')
const express    = require('express');
const bodyParser = require('body-parser');
const Customer   = require('./models/customer'); 
const { ObjectId } = require('mongodb');

const app = express();

// including pody parser
app.use(bodyParser.json());

// disable cors
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

// GET /api/customers
app.get('/api/customers', (req, res, next) => {
    Customer.find({})
    .then((customers) => {
        res.status(200).json({
            message: 'Customers fetched successfully!',
            customers: customers
        });
    })
    .catch((err) => {
        res.status(400).send(err);
    });
});

app.get('/api/customers/:id', (req, res, next) => {
    let customerId = req.params.id;

    // checking if id is valid...
    if (!ObjectId.isValid(customerId)) {
        res.status(404).send();
    }

    Customer.findOne({
        _id: customerId
    })
    .then((customer) => {
        if (!customer) 
            return res.status(404).send();
        res.json({
            message: 'Customer successfully found!',
            customer: customer
        });
    })
    .catch((err) => {
        res.status(400).send(err);
    })
});

// POST /api/customers
app.post('/api/customers', (req, res, next) => {
    const customer = new Customer(req.body)
    .save()
    .then((response) => {
        console.log(response);
        res.status(201).json({
            message: 'Post added successfully',
            customer: response
        });
    })
    .catch((err) => {
        res.status(400).send(err);
    })
});

app.patch('/api/customers/:id', (req, res, next) => {
    let customerId = req.params.id;
    // checking if id is valid...
    if (!ObjectId.isValid(customerId)) {
        res.status(404).send();
    }

    Customer.findOneAndUpdate({
        _id: customerId
    }, {
        $set: req.body
    }, {new : true})
    .then((customer) => {
        if (!customer)
            return res.status(404).send();
        res.status(200).json({
            message:'Customer successfully updated!',
            customer: customer
        });
    }).catch(err => {
        res.status(400).send(err);
    })
});

app.delete('/api/customers/:id', (req, res, next) => {
    let customerId = req.params.id;
    // checking if id is valid...
    if (!ObjectId.isValid(customerId)) {
        res.status(404).send();
    }

    Customer.findByIdAndRemove(customerId)
    .then((response) => {
        if (!response)
            return res.status(404).send();
        res.status(200).json({
            message: 'Customer successfully deleted!'
        });
    })
    .catch((err) => {
        res.status(400).send(err);
    });
})

module.exports = app;