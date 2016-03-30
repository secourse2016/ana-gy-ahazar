var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public/'));
app.use(express.static(__dirname + '/public/views/'));
app.use(express.static(__dirname + '/public/styles/'));
app.use(express.static(__dirname + '/public/scripts/'));
app.use(express.static(__dirname + '/public/assets/'));

app.get('/', function(req, res) {
   res.sendFile('index.html');
});

app.listen(3000, function() {
   console.log('[up]');
});
