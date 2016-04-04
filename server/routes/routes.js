module.exports = function(app) {

	app.get('/', function(req, res) {
 	  res.sendFile('index.html');
	});

	app.get('/api/countries', function(req, res) {
 	  res.json(require('../data/countries.json'));
	});	
};