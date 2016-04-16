var flights = require('../flights');

module.exports = function(app) {

	var jwt = require('jsonwebtoken');

	/**
	 * This route returns the master page
	 *
	 */
	app.get('/', function(req, res) {
		res.sendFile('index.html');
	});

	app.delete('/api/flights/:reservation', function(req, res) {
		var r = req.params.reservation;
		res.send('done');
	});

};
