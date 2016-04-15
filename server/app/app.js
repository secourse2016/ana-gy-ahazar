var express = require('express');
var app = express();

/* loading the enviroment variables */
require('dotenv').load();

/* setting the statics path */
app.use(express.static(process.env.STATICPATH));

/* setting the routes */
require('./routes/routes.js')(app);

module.exports = app;
