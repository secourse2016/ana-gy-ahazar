var flights = require('../flights');
var db = require('../db');

module.exports = function(app) {

	var jwt = require('jsonwebtoken');

	/**
	* This route returns the master page
	*
	*/
	app.get('/', function(req, res) {
		res.sendFile('index.html');
	});

// <<<<<<< HEAD
// 	app.get('/api/validatepromo/:promoCode', function(req, res) {
// 		var p = req.params.promoCode;
// 		var r = 0.0;
// 		if (p === 'f')
// 			r = 0.2;
// 		res.send(r + '');
// 	});
//
// =======
    /**
	 * This route deletes the database
	 *
	 */
	app.get('/db/delete', function(req, res) {
    db.clear(function(){
    	res.send("deleted successfully");
       });
   });
     /**
	 * This route gets a specific reservation information
	 *
	 */
	 app.get('/api/flights/reservation/:bookingReference', function(req, res) {
		 flights.getReservation(function(err, data) {
			 res.json(data);
		 }, req.params.bookingReference);
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
		var promoCode = req.params.promoCode;
		db.getDatabase().collection('promotionCodes').find({"code": promoCode}).toArray(function(err, result) {
		  result = result[0];

			if (err) {
				throw err;
			}
			if (result) {
				var valid =	result.valid;
				if(valid){
					var discount = result.discount;
					db.getDatabase().collection('promotionCodes').remove({"code": promoCode},  function(err, results) {
						if(err){
							throw err;
						}
						res.send(discount+"");
					});

				}else{
					res.send(0.0+"");
				}
			} else {
				res.send(0.0+"");
			}
		});
	});
};
