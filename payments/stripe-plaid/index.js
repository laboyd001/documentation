'use strict';

var util = require('util');

var express = require('express');
var bodyParser = require('body-parser');

var APP_PORT =8000;
var PLAID_PUBLIC_KEY = 'ac74fa22c24ef930a371dcdb50e451';
var PLAID_ENV = 'sandbox';



var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.get('/', function(request, response, next) {
  response.render('index.ejs');
});


var server = app.listen(APP_PORT, function() {
  console.log('plaid-quickstart server listening on port ' + APP_PORT);
});

var prettyPrintResponse = response => {
  console.log(util.inspect(response, {colors: true, depth: 4}));
};

