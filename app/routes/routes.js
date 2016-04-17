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

	/**
	 * This route returns a json object with all the countries.
	 *
	 */
	app.get('/api/countries', function(req, res) {
		flights.getCountries(function(err, data) {
			res.json(data);
		});
	});

	/**
	 * This route returns a json objects with all the airports.
	 *
	 */
	 app.get('/api/airports', function(req, res) {
		 flights.getAirports(function(err, data) {
			 res.json(data);
		 });
	 });

	 /**
	 * This route seeds the database
	 *
	 */
	app.get('/db/seed', function(req, res) {
		flights.seed(function(){
			res.send("seeded sucessful");
		});
	 });

	 /**
	  * This route validates the promotion_code
	  *
	  */
	app.get('/api/validatepromo/:promoCode',function(req,res) {

	});
};
