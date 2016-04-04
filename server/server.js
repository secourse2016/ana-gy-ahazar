var express = require('express');
var app = express();

app.use(express.static(__dirname + '/../public/'));
app.use(express.static(__dirname + '/../public/views/'));
app.use(express.static(__dirname + '/../public/styles/'));
app.use(express.static(__dirname + '/../public/styles/libraries'));
app.use(express.static(__dirname + '/../public/scripts/'));
app.use(express.static(__dirname + '/../public/scripts/controllers'));
app.use(express.static(__dirname + '/../public/scripts/libraries'));
app.use(express.static(__dirname + '/../public/assets/'));

require('./routes/routes.js')(app);

app.listen(3000, function() {
   console.log('[up]');
});
