var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

/* loading the enviroment variables */
require('dotenv').load();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* setting up the app to accept (DELETE, PUT...etc requests) */
app.use(methodOverride());

/* setting the statics path */
app.use(express.static(process.env.STATICPATH));

/* setting the routes */
require('./routes/routes.js')(app);

module.exports = app;
