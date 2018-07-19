'use strict';
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var routes = require('./routes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('Mock Service RESTful API server started on: ' + port);
console.log('Testing Member Numbers: 10, 20');
