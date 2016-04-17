var flights = require('../flights');
var db = require('../db.js');

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
		flights.seed(function(err,seeded){
			if(err){
				throw err;
			}
			res.send("seeded sucessful");
		});
	});

	/**
	* This route validates the promotion_code
	*
	*/
	app.get('/api/validatepromo/:promoCode',function(req,res) {
		db.getDatabase().collection('promotionCodes').findOne(promoCode, function(err, result) {
			if (err) {
				throw err;
			}
			if (result && valid) {
				var valid =	result.valid;
				var discount = result.discount
				db.getDatabase().collection('promotionCodes').deleteOne(promoCode,  function(err, results) {
					res.send(discount+"");
					});
			} else {
				res.send(0.0+"");
			}
		});
	});
};
