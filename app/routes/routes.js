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

//<<<<<<< HEAD
	app.delete('/api/flights/:reservation', function(req, res) {
		var r = req.params.reservation;
		res.send('done');
	});

//=======
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
		db.getDatabase().collection('promotionCodes').findOne(promoCode, function(err, result) {
			if (err) {
				throw err;
			}
			if (result) {
				var valid =	result.valid;
				if(valid){
					var discount = result.discount
					db.getDatabase().collection('promotionCodes').deleteOne(promoCode,  function(err, results) {
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
