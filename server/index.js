const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const path = require('path');
const app = express();

const mongoConn = require('./mongoConnection');
mongoConn();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', require(path.join(__dirname, 'api/v1')));

app.listen(3000, () => {
    console.log("Express Connected");
});

module.exports = {"app" : app, "mongo": mongoose};
