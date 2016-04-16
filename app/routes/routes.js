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

	app.get('/api/validatepromo/:promoCode', function(req, res) {
		var p = req.params.promoCode;
		var r = 0.0;
		if (p === 'f')
			r = 0.2;
		res.send(r + '');
	});

};
