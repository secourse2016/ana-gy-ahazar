var express = require('express');
var bodyParser = require('body-parser');
var app = express();

/* loading the enviroment variables */
require('dotenv').load();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* setting the statics path */
app.use(express.static(process.env.STATICPATH));

/* setting the routes */
require('./routes/routes.js')(app);

module.exports = app;
